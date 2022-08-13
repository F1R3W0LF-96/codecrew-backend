import express from "express";
import articleController from "./article.controler";

export const articleRouter=express.Router();

articleRouter.route('/')
.get(articleController.findArticles)
.post(articleController.createArticle)
.put(articleController.updateArticle)
.delete(articleController.deleteArticle);
