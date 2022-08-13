import express from "express";
import 'dotenv/config' 
import DB from './config/db';
import CORS from "./middlewares/cors";
import notFound from "./middlewares/notFound";
import error from "./middlewares/error";
import { restRouter } from "./api/resources";

const app=express();
const PORT=process.env.PORT || 5000;


//Create connection to mongodb
DB.connect();

app.use(express.json());
app.use(CORS.handleCors);
app.use('/api', restRouter);

app.use(notFound);
app.use(error);

app.get("/",(req,res)=>{
    res.send("Hello World");
}
);
app.listen(PORT,()=>{
  console.log(`Server is running on port http://localhost:${PORT}`);
} 
);