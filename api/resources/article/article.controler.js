import { constant } from "../../../helpers/constant";
import Article from "./article.model";

export default {

    async createArticle(req, res, next) {
        console.log("createArticle:::::::",req.body);
        try {
            const foundArticle=await Article
            .findOne({title:req.body.title});
        
            if(!foundArticle){

                const article=await Article.create(req.body);
                return res.send({
                    message:constant.SUCCESS,
                    data:article
                })
            }
            else{
                return res.status(400).send({
                    message:constant.EXISTS
                })
            }
        }
        catch (err) {
            next(err);
        }

    },
    async findArticles(req, res, next) {
        try {

            const articles=await Article.find();
            return res.send({
                message:constant.SUCCESS,
                data:articles
            })
        }
        catch (err) {
            next(err);
        }
    },
    async findArticle(req, res, next) {

        try {
            const foundArticle=await Article.findOne({_id:req.params.id});
            if(!foundArticle){
                return res.status(404).send({
                    message:constant.NOT_FOUND
                })
            }
            return res.send({
                message:constant.SUCCESS,
                data:foundArticle
            })
        }
        catch (err) {
            next(err);
        }
    },
    async updateArticle(req, res, next) {

        try {
            const foundArticle=await Article.findOne({_id:req.params.id});
            if(!foundArticle){
                return res.status(404).send({
                    message:constant.NOT_FOUND
                })
            }
            const updatedArticle=await Article.updateOne({_id:req.params.id},req.body);
            return res.send({
                message:constant.SUCCESS,
                data:updatedArticle
            })
        }
        catch (err) {
            next(err);
        }
    },
    async deleteArticle(req, res, next) {
            
            try {
                const foundArticle=await Article.findOne({_id:req.params.id});
                if(!foundArticle){
                    return res.status(404).send({
                        message:constant.NOT_FOUND
                    })
                }
                const deletedArticle=await Article.deleteOne({_id:req.params.id});
                return res.send({
                    message:constant.SUCCESS,
                    data:deletedArticle
                })
            }
            catch (err) {
                next(err);
            }
        },
    async deleteArticles(req, res, next) {
                
                try {
                    const deletedArticles=await Article.deleteMany();
                    return res.send({
                        message:constant.SUCCESS,
                        data:deletedArticles
                    })
                }
                catch (err) {
                    next(err);
                }
            },
    async findArticlesByUser(req, res, next) {
        try {
            const foundArticles=await Article.find({user:req.params.id});
            if(!foundArticles){
                return res.status(404).send({
                    message:constant.NOT_FOUND
                })
            }
            return res.send({
                message:constant.SUCCESS,
                data:foundArticles
            })
        }
        catch (err) {
            next(err);
        }
    },
    async findArticlesByTitle(req, res, next) {
        try {
            const foundArticles=await Article.find({title:req.params.title});
            if(!foundArticles){
                return res.status(404).send({
                    message:constant.NOT_FOUND
                })
            }
            return res.send({
                message:constant.SUCCESS,
                data:foundArticles
            })
        }
        catch (err) {
            next(err);
        }
    },
    async findArticlesByContent(req, res, next) {
        try {
            const foundArticles=await Article.find({content:req.params.content});
            if(!foundArticles){
                return res.status(404).send({
                    message:constant.NOT_FOUND
                })
            }
            return res.send({
                message:constant.SUCCESS,
                data:foundArticles
            })
        }
        catch (err) {
            next(err);
        }
    },
   
}