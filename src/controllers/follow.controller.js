import connection from "../database/db.js";
export async function Follow(req, res) {
    const { follower, followed } = res.locals;
    try {
        const alreadyFollow = await connection.query(`SELECT * FROM follows WHERE "followerId" = $1 AND "followedId" = $2;`,
        [follower, followed])
        if (alreadyFollow.rowCount !== 0){
            res.status(400).send({message: "Voce já segue essa pessoa"});
            return;
        }
        await connection.query(`INSERT INTO follows ("followerId", "followedId") VALUES ($1, $2);`,[follower, followed])
        res.sendStatus(201);
    } catch (error) {
        res.sendStatus(500);
    }
}

export async function unFollow(req, res) {
    const { follower, followed } = res.locals;
    try {
        const notFollow = await connection.query(`SELECT * FROM follows WHERE "followerId" = $1 AND "followedId" = $2;`,
        [follower, followed]);
        if (notFollow.rowCount === 0){
            res.status(400).send({message: "Voce não segue essa pessoa"});
            return;
        }
        await connection.query(`DELETE FROM follows WHERE "followerId" = $1 AND "followedId" = $2;`,
        [follower, followed] );
        res.sendStatus(204);
    } catch (error) {
        res.sendStatus(500);
    }
}

export async function isFollowed(req, res) {
    const { follower, followed } = res.locals;
    try {
        const notFollow = await connection.query(`SELECT * FROM follows WHERE "followerId" = $1 AND "followedId" = $2;`,
        [follower, followed]  );
        if (notFollow.rowCount === 0){
            res.send(false);
            return;
        }
        res.send(true);
    } catch (error) {
        res.sendStatus(500);
    }
}