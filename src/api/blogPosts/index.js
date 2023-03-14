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
    const blogPosts = await BlogPostsModel.find();
    res.send(blogPosts);
  } catch (error) {
    next(error);
  }
});

blogPostsRouter.get("/:blogPostsID", async (req, res, next) => {
  try {
    const blogPost = await BlogPostsModel.findById(req.params.blogPostsID);
    if (blogPost) {
      res.send(blogPost);
    } else {
      next(
        createHttpError(
          404,
          `BlogPost with id ${req.params.blogPostsID} not found!`
        )
      );
    }
  } catch (error) {
    next(error);
  }
});

blogPostsRouter.put("/:blogPostsID", async (req, res, next) => {
  try {
    const updatedBlogPost = await BlogPostsModel.findByIdAndUpdate(
      req.params.blogPostsID,
      req.body,
      { new: true, runValidators: true }
    );
    if (updatedBlogPost) {
      res.send(updatedBlogPost);
    } else {
      next(
        createHttpError(
          404,
          `BlogPost with id ${req.params.blogPostsID} not found!`
        )
      );
    }
  } catch (error) {
    next(error);
  }
});

blogPostsRouter.delete("/:blogPostsID", async (req, res, next) => {
  try {
    const deletedBlogPost = await BlogPostsModel.findByIdAndDelete(
      req.params.blogPostsID
    );
    if (deletedBlogPost) {
      res.status(204).send();
    } else {
      next(
        createHttpError(
          404,
          `BlogPost with id ${req.params.blogPostsID} not found!`
        )
      );
    }
  } catch (error) {
    next(error);
  }
});

export default blogPostsRouter;
