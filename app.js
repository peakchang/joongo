import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';
import session from 'express-session';
import dotenv from 'dotenv';
import passport from 'passport';
import helmet from 'helmet';
import hpp from 'hpp';
import cors from 'cors';
import bodyParser from 'body-parser';

// import { handler } from "./front/build/handler.js"

// 최초 테이블 생성
import { tableSetting } from './lib/back_lib/set_table.js';
tableSetting()

// router 설정
import { apiRouter } from "./routes/api.js"


import { passportConfig } from './passport/passport.js';
console.log(process.env.COOKIE_SECRET);


// ESM 오류 해결을 위해 __dirname, __filename 직접 변수 작성
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

dotenv.config();
passportConfig();


app.set('port', process.env.PORT || 8000);

if (process.env.NODE_ENV === 'production') {
    app.use(morgan('combined'));
    app.use(helmet({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false }));
    app.use(hpp());
} else {
    app.use(morgan('dev'));
}


app.use(express.static(path.join(__dirname, 'public')));
app.use('/editor_img', express.static(path.join(__dirname, 'uploads/editor')));
app.use('/on_img', express.static(path.join(__dirname, 'uploads/img')));
app.use('/back_lib', express.static(path.join(__dirname, 'lib/back_lib')));
// bodyParser
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser(process.env.COOKIE_SECRET));

if (process.env.NODE_ENV === 'production') {
    var https_status = true
} else {
    var https_status = false
}

const sessionOption = {
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: https_status,
        // maxAge: 60 * 1000 * 120,
    },
};

if (process.env.NODE_ENV === 'production') {
    sessionOption.proxy = true;
    sessionOption.cookie.secure = true;
}

app.use(session(sessionOption));

app.use(passport.initialize());
app.use(passport.session());

let corsOptions = {
    // 여기는 svelte (프론트엔드) 가 돌아가는 주소
    // origin: '*',
    origin: 'http://localhost:5173',
    // origin: 'http://127.0.0.1:5173',
    credentials: true
}
app.use(cors(corsOptions));

// Arrow Func은 오류가 발생...


app.use('/api/v4', apiRouter);

app.use('/test1', (req, res,next) => {
    res.sendFile(__dirname + '/front/build/test1.html')
})

app.use('/test2', (req, res,next) => {
    res.sendFile(__dirname + '/front/build/test2.html')
})

app.use('/', (req, res,next) => {
    console.log(__dirname);
    // res.send('alsdjfliasjdf')
    // res.sendFile('./front/build/index.html')
    // res.sendFile(__dirname + '/testhtml/test.html')
    res.sendFile(__dirname + '/front/build/index.html')
})


app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    // res.render('error');
})

export { app }
