import { sign } from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { constant } from "../../../helpers/constant";
import config from "../../../config/auth"
import User from "./user.model";




export default {

    async createUser(req, res, next) {
        try {
            const foundUser = await User
                .findOne({ email: req.body.email });

            if (!foundUser) {

                const user = await User.create(req.body);
                return res.send({
                    message: constant.SUCCESS,
                    data: user
                })
            }
            else {
                return res.status(400).send({
                    message: constant.EXISTS
                })
            }
        }
        catch (err) {
            next(err);
        }

    },
    async findUsers(req, res, next) {
        try {

            const users = await User.find();
            return res.send({
                message: constant.SUCCESS,
                data: users
            })
        }
        catch (err) {
            next(err);
        }
    },
    async findUser(req, res, next) {

        try {
            const foundUser = await User.findOne({ _id: req.params.id });
            if (!foundUser) {
                return res.status(404).send({
                    message: constant.NOT_FOUND
                })
            }
            return res.send({
                message: constant.SUCCESS,
                data: foundUser
            })
        }
        catch (err) {
            next(err);
        }
    },
    async updateUser(req, res, next) {

        try {
            let user = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                age: req.body.age,
            };
            const updateUser = await User.findOneAndUpdate({ _id: req.query.id }, user, { new: true });
            if (!updateUser) {
                return res.status(404).send({
                    message: constant.NOT_FOUND
                })
            }
            else {
                return res.send({
                    message: constant.UPDATED,
                    data: updateUser
                })
            }
        }
        catch (err) {
            next(err);
        }
    },
    async deleteUser(req, res, next) {
        try {

            const deleteUser = await User.findByIdAndRemove({ _id: req.query.id });
            if (!deleteUser) {
                return res.status(404).send({
                    message: constant.NOT_FOUND
                })
            }
            else {
                return res.send({
                    message: constant.DELETED
                })
            }

        }
        catch (err) {
            next(err);
        }
    },
    async loginUserDetails(req, res, next) {
        try {
            const userPayload = {}
            userPayload.email = req.body.email
            const foundUser = await User.findOne({ email: userPayload.email })
            if (foundUser) {
                const validPassword = await bcrypt.compare(req.body.password, foundUser.password);
                if (validPassword) {
                    var token = sign({ email: userPayload.email }, config.secret, {
                        expiresIn: 86400 // 24 hours
                    });
                    userPayload.token = token;
                    userPayload.firstName = foundUser.firstName;
                    userPayload.lastName = foundUser.lastName;
    
                    return res.send({
                        message: constant.SUCCESS,
                        data: userPayload
                    })
                } else {
                  res.status(400).json({ error: "Invalid Password" });
                }
            }
        }
        catch (err) {
            next(err);
        }
    },
    async signUpUserDetails(req, res, next) {
        const userDetails = {
            email: req.body.email,
            password: req.body.password
        }
        const salt = await bcrypt.genSalt(10);
        // now we set user password to hashed password
        userDetails.password = await bcrypt.hash(userDetails.password, salt);
        const userFound = await User.findOne({ email: userDetails.email })
        try {
            if (!userFound) {
              
                var token = sign({ email: userDetails.email }, config.secret, {
                    expiresIn: 86400 // 24 hours
                });
                await User.create(userDetails);
                delete userDetails.password;
                userDetails.token = token;
                console.log("user::::",userDetails)
                return res.send({
                    message: constant.SUCCESS,
                    data: userDetails
                })

            }
            else {
                return res.send({
                    message: constant.EXISTS,
                    status: 200
                })
            }
        } catch (err) {
            next(err);
        }

    }

}
