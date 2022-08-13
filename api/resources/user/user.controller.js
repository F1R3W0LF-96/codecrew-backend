import User from "../user/user.model";

const EXISTS = "EXISTS";
const NOT_FOUND = "NOT_FOUND";
const SUCCESS = "SUCCESS";
const UPDATED = "UPDATED";
const DELETED = "DELETED";

export default {

    async createUser(req, res, next) {
        try {
            const foundUser=await User
            .findOne({email:req.body.email});
        
            if(!foundUser){

                const user=await User.create(req.body);
                return res.send({
                    message:SUCCESS,
                    data:user
                })
            }
            else{
                return res.status(400).send({
                    message:EXISTS
                })
            }
        }
        catch (err) {
            next(err);
        }

    },

    async findUsers(req, res, next) {
        try {

            const users=await User.find();
            return res.send({
                message:SUCCESS,
                data:users
            })
        }
        catch (err) {
            next(err);
        }
    },
    async findUser(req, res, next) {

        try {
            const foundUser=await User.findOne({_id:req.params.id});
            if(!foundUser){
                return res.status(404).send({
                    message:NOT_FOUND
                })
            }
            return res.send({
                message:SUCCESS,
                data:foundUser
            })
        }
        catch (err) {
            next(err);
        }
    },
    async updateUser(req, res, next) {

        try {
            let user={
                firstName:req.body.firstName,
                lastName:req.body.lastName,
                email:req.body.email,
                age:req.body.age,
            };
            const updateUser=await User.findOneAndUpdate({_id:req.query.id},user,{new:true});
            if(!updateUser){
                return res.status(404).send({
                    message:NOT_FOUND
                })
            }
            else{
                return res.send({
                    message:UPDATED,
                    data:updateUser
                })
            }
        }
        catch (err) {
            next(err);
        }
    },
    async deleteUser(req, res, next) {
        try {
           
            const deleteUser=await User.findByIdAndRemove({_id:req.query.id});
       if(!deleteUser){
           return res.status(404).send({
               message:NOT_FOUND
           })
       }
       else{
              return res.send({
                message:DELETED
              })
       }
       
        }
        catch (err) {
            next(err);
        }
    }



}
