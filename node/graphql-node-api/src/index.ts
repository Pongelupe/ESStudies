import * as http from 'http';
import app from "./app";

const server: http.Server = http.createServer(app);
server.listen(3000, () => console.log('Server de pé na 3000'));

