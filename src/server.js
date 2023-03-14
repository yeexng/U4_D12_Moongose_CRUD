import Express from "express";
import listEndpoints from "express-list-endpoints";
import cors from "cors";
import mongoose from "mongoose";
import blogPostsRouter from "./api/blogPosts/index.js";

const server = Express();
const port = process.env.PORT || 3005;

server.use(cors());
server.use(Express.json());

server.use("/blogPosts", blogPostsRouter);

mongoose.connect(process.env.MONGO_URL);
mongoose.connection.on("connected", () => {
  console.log("✅ Successfully connected to Mongo!");
  server.listen(port, () => {
    console.table(listEndpoints(server));
    console.log(`✅ Server on port ${port}`);
  });
});
