const Koa = require('koa')
const app = new Koa()
var router = require('koa-router')()
var cors = require('koa2-cors');
const markdown = require('./lib/markdown/index')

app.use(cors({
    origin: function (ctx) {
        if (ctx.url === '/test') {
            return '*';
        }
        return '*';
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));

router.post('/', async function (ctx) {
    let pastData = await parsePostData(ctx);
    let aa = parseQueryStr(pastData);

    ctx.body = markdown().render(aa.html).html;
});



function parsePostData(ctx) {
    return new Promise((resolve, reject) => {
        try {
            let postdata = "";
            ctx.req.on('data', (data) => {
                postdata += data
            })
            ctx.req.addListener("end", function () {

                resolve(postdata);
            })
        } catch (error) {
            reject(error);
        }
    });
}

function parseQueryStr(queryStr) {
    let queryData = {};
    let queryStrList = queryStr.split('&');
    for (let [index, queryStr] of queryStrList.entries()) {
        let itemList = queryStr.split('=');
        queryData[itemList[0]] = decodeURIComponent(itemList[1]);
    }
    return queryData
}

app.use(router.routes()).use(router.allowedMethods());

app.listen(9016)
console.log('[demo] start-quick is starting at port 9016')