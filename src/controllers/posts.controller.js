import connection from "../database/db.js";
export async function viewLikes(req, res){
    const postId = 1;
    try {
        const likes = await connection.query(`SELECT likes.*, users.name as username from likes join users on likes."userId" = users.id  WHERE likes."postId" = $1`, [postId]);
        res.send(likes.rows)
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function likePost(req, res){
    const userId = 1;
    const postId = 1;

    try {
        const like = await connection.query(`INSERT INTO likes ("userId", "postId") values ($1, $2)`, [userId, postId]);
        res.send(like)
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}