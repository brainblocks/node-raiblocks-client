
let nock = require('nock');

let { COMMANDS } = require('../src/commands');
let { client } = require('../index');

let raiClient = client({
    rai_node_host: 'http://127.0.0.1:7076'
});

for (let command of COMMANDS) {
    test(`Rai RPC command ${ command }`, () => {
        
        nock('http://127.0.0.1:7076')
            .post('/', {
                action: command
            }).reply(200, {
                status: 'success',
                foo: 'bar'
            });

        return raiClient[command]({ }).then(result => {
            if (result.status !== 'success') {
                throw new Error(`Expected result.status to be 'success', got ${ result.status }`);
            }

            if (result.foo !== 'bar') {
                throw new Error(`Expected result.foo to be 'bar', got ${ result.foo }`);
            }
        });
    });
}