import connection from "../database/db.js";

export async function tokenValidation(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    if (token === undefined) {
        res.status(401).send("missing token")
        return
    }

    const userObj = await connection.query(`SELECT sessions."userId" FROM sessions WHERE token = $1`, [token]);

    if (userObj.rowCount === 0) {
        res.status(401).send("Token Authentication failed")
        return
    }
    res.locals.userId = userObj.rows[0].userId;
    next()
}