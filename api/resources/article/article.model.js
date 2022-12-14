import mongoose from "mongoose";

const Schema = mongoose.Schema;

const articleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    topic: {
        type: String,
        required: true
    },
    subtopic: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    body: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}
);

const articleListModel={
    title: "",
    topic:"",
    subtopic: "",
    description: ""
}
const Article=mongoose.model("Article", articleSchema);

export  {
    Article,
    articleListModel
}