import connection from "../database/db";

export async function getPosts(req,res){
    try{
        const {rows} = await  connection.query(`SELECT u.id,u.name,
        COUNT(a.url) AS "linksCount",COALESCE(SUM(a."visitCount"),0) 
        AS "visitCount"
        FROM users u 
        LEFT JOIN urls a ON u.id= a."userId" GROUP BY u.id
        ORDER BY "visitCount" DESC LIMIT 10
          `)
          res.status(200).send(rows)
      }
      catch(err){
          res.status(422).send(err.message);
          return
      }
}