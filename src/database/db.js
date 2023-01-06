import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pg;

//const configDatabase = {
  //connectionString: process.env.DATABASE_URL,
 // ssl: {
  //  rejectUnauthorized: false,
 // },
//};

<<<<<<< HEAD
const connection = new Pool(configDatabase);
=======
 const configDatabase = {
  connectionString: process.env.DATABASE_URL
 };
>>>>>>> aefd3a8 (mkpost e getpost finalizados)

export default connection;