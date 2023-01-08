import connection from "../database/db.js";

export async function userLikes(req, res) {
    const userId = 3

    try {
        const { rows } = await connection.query('SELECT likes.id FROM likes JOIN users ON likes."userId" = users.id where users.id = $1', [userId]);
        res.send(rows)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
}

export async function likePost(req, res) {
    let liked = req.liked
    // const { userId } = res.locals;
    const userId = 3;
    const { postId } = req.params
    try {
        if (liked === false) {
            await connection.query('INSERT INTO likes ("userId", "postId") VALUES ($1, $2)', [userId, postId]);
            liked = true
        } else {
            await connection.query('delete from likes where likes."userId" = $1 and likes."postId" = $2', [userId, postId]);
            liked = false
        }

        const { rows } = await connection.query(`SELECT likes.*, users.name as username from likes join users on likes."userId" = users.id  WHERE likes."postId" = $1`, [postId]);

        res.status(200).json({ rows, liked })
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function getPosts(req, res) {
    try {
        const { rows } = await connection.query(`SELECT posts.id as "postId", posts."userId", posts.link, posts.description, (select count(likes."postId") from likes  where likes."postId" = posts.id) as "likeQtd", users.name as username, users."pictureUrl", (select jsonb_agg(json_build_object('id', likes.id, 'username', users.name, 'userId', likes."userId", 'postId', likes."postId"))  from likes join users on likes."userId" = users.id where likes."postId" = posts.id) as "likedBy" FROM posts JOIN users ON posts."userId" = users.id ORDER BY posts.id DESC LIMIT (20)`)
        res.status(200).send(rows)
    }
    catch (err) {
        console.log(err)
        res.status(422).send(err.message);
        return
    }
}
export async function mkPost(req, res) {
    const { link, description } = req.body
    const { authorization } = req.headers
    const token = authorization?.replace("Bearer ", "")
    const likeQtd = 0
    try {
        const { rows } = await connection.query("SELECT * FROM sessions WHERE token =$1", [token])
        await connection.query(
            'INSERT INTO posts ("userId",link,description,"likeQtd") VALUES ($1,$2,$3,$4);',
            [rows[0].userId, link, description, likeQtd]
        );
        res.sendStatus(201)
    }
    catch (err) {
        res.status(422).send(err.message);
        return
    }
}