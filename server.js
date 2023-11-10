const next = require('next');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev});
const Server = require('./hapi-think');
// global.SystemConfig = JSON.parse(Fs.readFileSync(Path.join(process.cwd(),'config.json')), 'utf-8');
app.prepare().then(async () => {
    const server = await Server(app);
    server.start();
    console.log(`> Ready on http://localhost:${server.info.port}/admin`);
}).catch(e=>{
    console.error(e.message)
});
