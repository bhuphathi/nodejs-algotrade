const path = require('path');
const database = require('./utils/database');
const utils = require('./utils/utils');
const express = require('express');
const AccessLogModel = require('./models/accessLog');

const adminRT = require('./routes/adminRT');

const app = express();
let lastAccessLogId;

//make process.env accessible in app
require('./config/environment');

//body-parser settings
app.use(express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.use(express.json());

app.use(async (req, res, next)=>{
    //allows all domain
    res.header('Access-Control-Allow-Origin', '*');
    // const allowedOrigins = ['http://127.0.0.1:3001', `${process.env.STATICIP}:3001` ];

    // const origin = req.headers.origin;
    // if (allowedOrigins.indexOf(origin) > -1) {
    //     res.setHeader('Access-Control-Allow-Origin', origin);
    // }

    // res.header('Access-Control-Allow-Methods', 'POST');
    // res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Authorization');

    const { rawHeaders, method, socket, url, session, body } = req;
    const { remoteAddress, remoteFamily } = socket;
    const refererUrl = rawHeaders.referer?.split('/')[3];
    const startTime = utils.ddmmyyyyDateTime();

    if (req) {
        const authCode = utils.authCodeSplit(req)

        const reqLog = {
            timestamp: Date.now(),
            date: utils.ddmmyyyy(),
            rawHeaders,
            method,
            remoteAddress,
            remoteFamily,
            url,
            refererUrl,
            session,
            body: JSON.stringify(body),
            code: authCode
        }

        console.log('\n\x1b[36m' + startTime, '\x1b[0m');
        console.log('\x1b[36mRemoteAddress:', reqLog.remoteAddress, '\x1b[0m');
        console.log('URL:', url, '\n')
        console.log('Code:', reqLog.code, '\n')

        //save server access log to db
        lastAccessLogId++; //increase access _id
        const saveLog = new AccessLogModel(reqLog, lastAccessLogId, res.locals.currentUser)
        const logResult = await saveLog.save();
    }
    next();
});

app.use(adminRT);

database.mongoConnect((adminClient, client)=>{
    //wait for db connect and start server
    const server = app.listen(process.env.PORT, async (port)=>{
        console.log('Listening on port: ', server.address().port);

        const lastAccessData = await AccessLogModel.findLastInserted();
        lastAccessLogId = lastAccessData?._id || 0;
        console.log('lastAccessLogId:', lastAccessLogId)        
    });
});

