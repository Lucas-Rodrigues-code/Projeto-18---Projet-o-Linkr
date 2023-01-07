import connection from "../database/db.js";

export async function getAllTrends(req, res) {
    const { userId } = res.locals.userId
    
    try {
        const trends = await connection.query(`SELECT trends.trend AS "hashtag", COUNT(likes."postId") AS "likeNumber" FROM trends JOIN likes ON trends."postId" = likes."postId" GROUP BY "hashtag" ORDER BY "likeNumber";`)
        if (trends.rowCount === 0) {
            res.status(200).send([])
        }
        res.status(200).send(trends.rows)
    } catch (err) {
        res.status(500).send(err.message)
    }
}


export async function getPostByTrend(req, res) {
    
    try {

        const trends = await connection.query(`SELECT users.name AS "username", posts.link AS "link",  posts.description AS "text" FROM users JOIN posts ON  users.id = posts."userId" JOIN trends ON posts.id = trends."postId" WHERE trends.trend = $1;`, [req.params.trend])
        if (trends.rowCount === 0) {
            res.status(200).send([])
        }
        res.status(200).send(trends.rows)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

