import mongoose from "mongoose";

const Schema = mongoose.Schema;
const userSchema=new Schema({

    email: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String
    },
    age: {
        type: Number
    }
}
);

export default mongoose.model("User",userSchema);