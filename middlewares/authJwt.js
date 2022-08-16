import { sign, verify } from "jsonwebtoken";
import config from "../config/auth"


export default {
    async authJwt(req, res, next) {
        var token = sign({ id: "test"}, config.secret, {
            expiresIn: 86400 // 24 hours
          });
          console.log("new token",token);
        try {
            const token = req.headers["x-access-token"] || req.headers["authorization"];
            console.log(":::token:::",token);
            if (!token) {
                return res.status(401).send({
                    message: "Access denied. No token provided."
                });
            }
            const decoded = verify(token, config.secret);
            console.log(":::decoded:::",decoded);
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