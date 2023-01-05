import connection from "../database/db.js";

export async function likePost(req, res){
    const userId = 1;
    const { postId } = req.params
    console.log(postId)

    try {
        const post = await connection.query('SELECT * FROM posts WHERE posts.id = $1 ', [postId]);
        // console.log(post)
        
        const likeQtd = post.rows[0].likeQtd + 1;
        await connection.query('UPDATE posts SET "likeQtd" = $1 WHERE posts.id = $2', [likeQtd, postId]);

        await connection.query('INSERT INTO likes ("userId", "postId") VALUES ($1, $2)', [userId, postId]); 
        
        const likes = await connection.query(`SELECT likes.*, users.name as username from likes join users on likes."userId" = users.id  WHERE likes."postId" = $1`, [postId]);

        res.send(likes.rows)
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function unlikePost(req, res){
    const userId = 2;
    const {postId} = req.params;
    try {
        const post = await connection.query('SELECT * FROM posts WHERE posts.id = $1 ', [postId]);
        
        const likeQtd = post.rows[0].likeQtd - 1;
        await connection.query('UPDATE posts SET "likeQtd" = $1 WHERE posts.id = $2', [likeQtd, postId]);

        await connection.query('delete from likes where likes."userId" = $1 and likes."postId" = $2', [userId, postId]); 
        

        const likes = await connection.query(`SELECT likes.*, users.name as username from likes join users on likes."userId" = users.id  WHERE likes."postId" = $1`, [postId]);

        res.send(likes.rows)
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}
export async function getPosts(req,res){
    try{
        const {rows} = await  connection.query(`SELECT u.id,u.name,
        COUNT(a.url) AS "linksCount",COALESCE(SUM(a."visitCount"),0) 
        AS "visitCount"
        FROM users u 
        LEFT JOIN urls a ON u.id= a."userId" GROUP BY u.id
        ORDER BY "visitCount" DESC LIMIT 10
          `)
          res.status(200).send(rows)
      }
      catch(err){
          res.status(422).send(err.message);
          return
      }
}