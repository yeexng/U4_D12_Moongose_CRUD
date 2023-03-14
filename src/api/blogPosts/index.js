import express from "express";
import createHttpError from "http-errors";
import BlogPostsModel from "./model.js";

const blogPostsRouter = express.Router();

blogPostsRouter.post("/", async (req, res, next) => {
  try {
    const newBlogPost = new BlogPostsModel(req.body);
    const { _id } = await newBlogPost.save();
    res.status(201).send({ _id });
  } catch (error) {
    next(error);
  }
});

blogPostsRouter.get("/", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

blogPostsRouter.get("/blogPostsID", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

blogPostsRouter.put("/blogPostsID", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

blogPostsRouter.delete("/blogPostsID", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

export default blogPostsRouter;
