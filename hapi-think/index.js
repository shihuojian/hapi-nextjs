
const Hapi = require('@hapi/hapi')
module.exports = async (app) =>{
    const handler = app.getRequestHandler();
    const server = new Hapi.Server({
        port:3000,
    });

    server.route({
        method: 'GET',
        path: '/_next/{p*}',
        handler: async ({raw},h)=>{
            await handler(raw.req,raw.res);
            return h.abandon;
        },
    });

      //login page
    server.route({
        method: 'GET',
        path: '/test',
        handler: async ({ raw, query,url, params }, h) => {
          const pathName = url.pathname;
          const opts = {};
          const html = await app.render(raw.req,raw.res, pathName,{ ...query, ...params },opts);
          if (raw.res.headersSent) { return h.close;}
          return h.response(html).code(raw.res.statusCode);
        }
      });
   
    return server;
};

