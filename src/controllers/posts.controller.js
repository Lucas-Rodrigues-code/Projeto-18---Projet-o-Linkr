import connection from "../database/db.js";
import urlMetadata from "url-metadata";

export async function likePost(req, res) {
    const userId = res.locals.userId;
    const { postId } = req.params

    try {
        const post = await connection.query('SELECT * FROM posts WHERE posts.id = $1 ', [postId]);
        

        const likeQtd = post.rows[0].likeQtd + 1;
        await connection.query('UPDATE posts SET "likeQtd" = $1 WHERE posts.id = $2', [likeQtd, postId]);

        await connection.query('INSERT INTO likes ("userId", "postId") VALUES ($1, $2)', [userId, postId]);

        const likes = await connection.query(`SELECT likes.*, users.name as username from likes join users on likes."userId" = users.id  WHERE likes."postId" = $1`, [postId]);

        res.send(likes.rows)
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
}

export async function unlikePost(req, res) {
    const userId = res.locals.userId;
    const { postId } = req.params;
    try {
        const post = await connection.query('SELECT * FROM posts WHERE posts.id = $1 ', [postId]);

        const likeQtd = post.rows[0].likeQtd - 1;
        await connection.query('UPDATE posts SET "likeQtd" = $1 WHERE posts.id = $2', [likeQtd, postId]);

        await connection.query('DELETE from likes where likes."userId" = $1 and likes."postId" = $2', [userId, postId]);


        const likes = await connection.query(`SELECT likes.*, users.name as username from likes join users on likes."userId" = users.id  WHERE likes."postId" = $1`, [postId]);

        res.send(likes.rows)
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
}
export async function getPosts(req, res) {
    console.log(req.query.limit)
    let limit = 10

    if (req.query.limit) {
        limit = 10 * req.query.limit
    }
    
    try {
        const { rows } = await connection.query(`SELECT posts.link,posts.description,posts.id as "postId",
        "postImage"."imageDescription","postImage"."imageUrl","postImage"."title",
        users.name,users."pictureUrl" as "usersPhoto",users.id as "userId", posts."likeQtd"
        FROM posts 
        INNER JOIN "postImage" ON "postImage"."postId"=posts.id
        INNER JOIN users ON users.id=posts."userId" ORDER BY posts.id DESC LIMIT $1
        `, [limit])
        res.status(200).send(rows)
    }
    catch (err) {
        res.status(422).send(err.message);
        return
    }
}

export async function getPostsNumber(req, res) {
    try {
        const { rows } = await connection.query(`SELECT  COUNT(*) FROM posts`)
        res.status(200).send(rows[0])
    }
    catch (err) {
        res.status(422).send(err.message);
        return
    }
}

export async function mkPost(req, res) {
    const { link, description } = req.body
    const { authorization } = req.headers
    const token = authorization?.replace("Bearer ", "")
    const postImageData = {
        url: "",
        title: "",
        image: "",
        description: ""
    }
    const likeQtd = 0
    try {
        await urlMetadata(link).then(
            function (metadata) { // success handler
                postImageData.url = metadata.url
                postImageData['title'] = metadata.title
                postImageData.image = metadata.image
                postImageData.description = metadata.description
            },
            function (error) { // failure handler
                console.log(error)
            })
        console.log(postImageData)
        const { rows } = await connection.query("SELECT * FROM sessions WHERE token =$1", [token])
        console.log(token)
        console.log(rows)
        await connection.query(
            'INSERT INTO posts ("userId",link,description,"likeQtd") VALUES ($1,$2,$3,$4);',
            [rows[0].userId, link, description, likeQtd]
        );

        const myPost = await connection.query("SELECT * FROM posts WHERE link =$1", [link])
        await connection.query(
            'INSERT INTO "postImage" (url,"postId","imageDescription","imageUrl",title) VALUES ($1,$2,$3,$4,$5);',
            [postImageData.url, myPost.rows[0].id, postImageData.description, postImageData.image, postImageData.title]
        );
        res.sendStatus(201)
    }
    catch (err) {
        res.status(422).send(err.message);
        return
    }
}
export async function getPostsByUserId(req, res) {
    const { id } = req.params
    console.log('ENVIANDO POSTS DE UM USUARIO')
    try {
        const { rows } = await connection.query(`SELECT posts.link,posts.description,posts.id as "postId",
        "postImage"."imageDescription","postImage"."imageUrl","postImage"."title",
        users.name,users.id as "userId" , users."pictureUrl" as "usersPhoto", posts."likeQtd"
        FROM posts 
        INNER JOIN "postImage" ON "postImage"."postId"=posts.id
        INNER JOIN users ON users.id=posts."userId" WHERE users.id = $1 ORDER BY posts.id DESC LIMIT(20)
        `, [id])
        res.status(200).send(rows)
    }
    catch (err) {
        res.status(422).send(err.message);
        return
    }
}