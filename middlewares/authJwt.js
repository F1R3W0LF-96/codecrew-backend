import { sign, verify } from "jsonwebtoken";
import config from "../config/auth"
import { constant } from "../helpers/constant";


export default {
    async authJwt(req, res, next) {
        if (constant.BY_PASSED_URL.includes(req.originalUrl)) {
            console.log("bypassurl");
            next();
        }
        else {
            //   console.log("new token",token);
            try {
                const token = req.headers["x-access-token"] || req.headers["authorization"];
                console.log(":::token:::", token);
                if (!token) {
                    return res.status(401).send({
                        message: "Access denied. No token provided."
                    });
                }
                const decoded = verify(token, config.secret);
                console.log(":::decoded:::", decoded);
                req.user = decoded;
                next();
            } catch (err) {
                console.log(err);
                return res.status(500).send({
                    message: "Invalid token."
                });
            }
        }
    }
}