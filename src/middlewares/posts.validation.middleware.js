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