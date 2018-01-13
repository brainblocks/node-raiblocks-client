
let request = require('request-promise');
let exec = require('child-process-promise').exec;

let { COMMANDS } = require('./commands');

class Client {

    constructor({ rai_node_host }) {
        this.node_host = rai_node_host;
    }

    invoke(command, options) {

        return request({
            method: 'POST',
            uri: this.node_host,
            body: JSON.stringify({
                action: command,
                ...options
            }),
            resolveWithFullResponse: true
        }).then(res => {

            if (!res.statusCode) {
                throw new Error(`Expected status code from rai node for command: ${ command }`);
            }
        
            if (res.statusCode !== 200) {
                throw new Error(`Expected status to be 200, got ${ res.statusCode} for command: ${ command }`);
            }
            
            let data = JSON.parse(res.body);
        
            if (data.error) {
                throw new Error(`Rai node RPC error: ${ data.error }`);
            }
        
            return data;
        });
    }
}

for (let command of COMMANDS) {
    Client.prototype[command] = function(options) {
        return this.invoke(command, options);
    };
}

module.exports.client = (options) => {
    return new Client(options);
};