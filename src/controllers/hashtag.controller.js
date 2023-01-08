import connection from "../database/db.js";

export async function getAllTrends(req, res) {
    /* `SELECT trends.trend AS "hashtag", COUNT(likes."postId") AS "likeNumber" FROM trends JOIN likes ON trends."postId" = likes."postId" GROUP BY "hashtag" ORDER BY "likeNumber";` */
    try {
        const trends = await connection.query(`SELECT trend AS "hashtag" FROM trends LIMIT 10;`)

        if (trends.rowCount === 0) {
            return res.status(200).send([])
        }

        const hashtags = trends.rows.map((obj)=> Object.values(obj))

        res.status(200).send(hashtags)
    } catch (err) {
        res.status(500).send(err.message)
    }
}


export async function getPostByTrend(req, res) {
    try {
        const queryHashtag = '#' + req.params.hashtag
        console.log(queryHashtag)
        const trends = await connection.query(`SELECT users.name AS "username", posts.link AS "link",  posts.description AS "description" FROM users JOIN posts ON  users.id = posts."userId" JOIN trends ON posts.id = trends."postId" WHERE trends.trend = $1;`, [queryHashtag])
        if (trends.rowCount === 0) {
            res.status(401).send([])
            return
        }
        res.status(200).send(trends.rows)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function postTrend(req, res) {
    const { trend } = req.body

    const ids = await connection.query(`SELECT MAX(ID) FROM posts`)

    const postId = Number(ids.rows[0].max)
   
    try {

        await connection.query(`insert INTO trends (trend, "postId") VALUES ($1, $2)`, [trend, postId])
        res.sendStatus(200)
    }

    catch (err) {
        res.send(err.message).status(500)
    }
}
