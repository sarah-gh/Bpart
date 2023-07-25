const http = require('http')

class Server {
    constructor(config) {
        this._host = config.hostname;
        this._port = config.port;
        this._eventEmitter = config.eventEmitter;
        this._event = config.event;
    }

    start() {
        http.createServer((req, res) => {
            res.setHeader('Access-Control-Allow-Origin', '*')
            res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type,token");
            this._eventEmitter.emit(this._event, req, res);
        })
        .listen(this._port, this._host, () => {
            console.log(`Server is running at ${this._host}:${this._port}`);
        });
    }
}

module.exports = Server;