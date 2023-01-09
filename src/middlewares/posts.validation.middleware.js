import connection from "../database/db.js";

export async function mkPostValidation(req, res, next) {
    console.log('passando na validação')
    const { link } = req.body
    const { authorization } = req.headers
    if (!link) {
        res.sendStatus(422);
        return
    }
    if (!authorization?.includes("Bearer")) {
        res.sendStatus(401)
        return
    }
    const token = authorization?.replace("Bearer ", "")
    try {
        const { rows } = await connection.query("SELECT * FROM sessions WHERE token =$1", [token])
        if (rows.length === 0) {
            res.sendStatus(401)
            console.log('token invalido')
            return
        }
        console.log(rows)
    }
    catch (err) {
        res.status(422).send(err.message);
    }
    next()
}

export async function likedPostValidation(req, res, next) {
    // const { userId } = res.locals;
    const userId = 3;
    const { postId } = req.params
    let liked = false

    try {
        const likeNumber = await connection.query('select likes.id, likes."userId" , likes."postId" from likes join users on likes."userId" = users.id where likes."userId" = $1 and likes."postId" = $2', [userId, postId])

        if (likeNumber.rows[0] === undefined) {
            liked = false
        } else {
            liked = true
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }

    req.liked = liked;

    next()
}