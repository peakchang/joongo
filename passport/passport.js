import passport from "passport";
import passportJWT from "passport-jwt";
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
import bcrypt from "bcrypt";
import { Strategy as localStrategy } from 'passport-local';
import { sql_con } from '../lib/back_lib/set_db.js';

import dotenv from "dotenv"
dotenv.config();

export const passportConfig = () => {

    // 토큰 생성을 위해서 최초 유저 검증 단계 (로그인)
    passport.use('local', new localStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
        }, async (email, password, done) => {
            // 최초 유저 검증
            try {
                let getUserSql = `SELECT * FROM users WHERE user_email = '${email}';`;
                const getUser = await sql_con.promise().query(getUserSql)
                let exUser = getUser[0][0]
                if (exUser) {
                    const result = await bcrypt.compare(password, exUser.user_pwd);
                    if (result) {
                        done(null, exUser);
                    } else {
                        done(null, false, { error: '비밀번호가 일치하지 않습니다.' });
                    }
                } else {
                    done(null, false, { error: '가입된 아이디가 없습니다.' });
                }

            } catch (error) {
                console.error(error);
                done(error);
            }
        }
    ))



    // 토큰 생성 후 사이트 활동 중 검증 단계 (쓰지는 않지만 검토용으로 냅두자)
    passport.use(
        new JWTStrategy(
            {
                jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
                secretOrKey: process.env.JWT_SECRET_KEY,
            },
            async (jwt_payload, done) => {
                console.log('여기로 들어옴?!?!?!?');
                console.log(jwt_payload.userName);
                console.log('ㅅㅂ 기본적으로 찍혀야 할거 아냐');

                let getUserSql = `SELECT user_email,user_name, user_nick, user_provider, user_rate, user_thumbnail FROM users WHERE idx = ?;`;

                try {
                    const getUser = await sql_con.promise().query(getUserSql, [jwt_payload.userName])
                    const get_user = getUser[0][0]
                    return done(null, get_user);
                } catch (error) {
                    return done(null, false, { reason: '토큰이 만료 되었습니다. 재로그인 해주세요' });
                }
            }
        )
    );
}