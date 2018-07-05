const Koa = require('koa')
const app = new Koa()
const markdown = require('./lib/markdown/index')

app.use( async ( ctx ) => {
    //当请求时GET请求时，显示表单让用户填写
    if(ctx.url==='/' && ctx.method === 'GET'){
        let html =`
            <h1>Edik Markdown 解析接口</h1>
        `;
        ctx.body =html;
        //当请求时POST请求时
    }else if(ctx.url==='/' && ctx.method === 'POST'){
        let pastData=await parsePostData(ctx);
        let aa = parseQueryStr(pastData);
        ctx.body=markdown().render(aa.html).html;
    }else{
        //其它请求显示404页面
        ctx.body='<h1>404!</h1>';
    }
    // ctx.body = markdown().render(s).html
})

function parsePostData(ctx){
    return new Promise((resolve,reject)=>{
        try{
            let postdata="";
            ctx.req.on('data',(data)=>{
                postdata += data
            })
            ctx.req.addListener("end",function(){

                resolve(postdata);
            })
        }catch(error){
            reject(error);
        }
    });
}

function parseQueryStr(queryStr){
    let queryData={};
    let queryStrList = queryStr.split('&');
    for( let [index,queryStr] of queryStrList.entries() ){
        let itemList = queryStr.split('=');
        queryData[itemList[0]] = decodeURIComponent(itemList[1]);
    }
    return queryData
}


app.listen(9016)
console.log('[demo] start-quick is starting at port 3000')