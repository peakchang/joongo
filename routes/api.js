import express from "express";
import { sql_con } from "../lib/back_lib/set_db.js";
import bcrypt from "bcrypt";
import moment from "moment-timezone";
moment.tz.setDefault("Asia/Seoul");
import http from "http";

const apiRouter = express.Router();

apiRouter.use('/', (req, res, next) => {
    res.send('askldjfladjfgiljdilfgjslidfjg')
})

// module.exports = router;
export { apiRouter }