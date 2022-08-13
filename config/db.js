import mongoose from "mongoose";

mongoose.Promise = global.Promise;

export default {
    connect: () => {
        mongoose
            .connect(process.env.MONGODB_URI, 
                { useNewUrlParser: true, useUnifiedTopology: true })
                .then(() => {
                    console.log("Connected to MongoDB");
                }).catch(err => {
                    console.log("Error connecting to MongoDB: ", err);
                }
            );
    }
}