import connection from "../database/db.js";

export async function validateToken (req, res, next)  {
  const auth = req.headers.authorization;
  
  if (auth === undefined) {
    res.status(401).send({ message: "Sem token" });
    return;
  }
  if (!auth.includes("Bearer ")) {
    res.status(401).send({ message: "formato do token invalido" });
    return;
  }

  const token = auth.replace("Bearer ", "");

  const session = (await connection.query("SELECT * FROM sessions WHERE token=$1;", [token])).rows[0];
  if (!session) {
    res.status(404).send({ message: "Nenhuma session para esse token." });
    return;
  }

  const user = (await connection.query(`SELECT id, name, email, "pictureUrl" FROM users WHERE id=$1;`, [session.userId])).rows[0];
  if (!user) {
    res.status(404).send({ message: "sem usuario para  user_id de sessions." });
    return;
  }

  res.locals.user = user;
  next();
};




export async function validateUserId(req,res,next) {
    const follower = Number(res.locals.user.id);
    const followed = Number(req.params.id);

    if (!follower || !followed){
        res.status(400).send({message: 'Sem o id de usuarios'});
        return;
    }

    try {
        const checkUser = await connection.query(`SELECT id,name,"pictureUrl" FROM users WHERE id = $1;`, [follower]);
        if (checkUser.rowCount === 0) {
            res.status(400).send({ message: "usuario não existe." });
            return;
        }
    } catch (error) {
        res.sendStatus(500);
    }

    res.locals.follower = follower;
    res.locals.followed = followed;
    next();
}






















































