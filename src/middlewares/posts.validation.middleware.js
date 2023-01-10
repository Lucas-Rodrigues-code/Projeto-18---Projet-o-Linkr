import connection from "../database/db.js";

export async function mkPostValidation(req,res,next){
    
    const {link} = req.body
    const {authorization} = req.headers
    if(!link){
        res.sendStatus(422);
        return
    }
    if(!authorization?.includes("Bearer")){
        res.sendStatus(401)
        console.log(' não passando na validação')        
        return
    }
    const token= authorization?.replace("Bearer ","")
    try{
        const {rows} = await connection.query("SELECT * FROM sessions WHERE token =$1",[token])
        console.log(rows)
        if(rows.length===0){
            res.sendStatus(401)
            console.log('token invalido')
            console.log(rows)
            return
        }
        console.log(rows)
    }
    catch(err){
        res.status(422).send(err.message);
    }
    next()
}

export async function tokenValidation(req, res, next) {
    console.log(req.headers)
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    if (token === undefined) {
        res.status(401).send(`missing token ${ req.headers}`)
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