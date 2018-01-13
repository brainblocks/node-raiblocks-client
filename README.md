# Node RaiBlocks Client

Raiblocks client for Node.js

### Install

Install the module:

```bash
npm install --save raiblocks-client
```

Install the RaiBlocks node: https://github.com/clemahieu/raiblocks

### Example

```javascript
let { client } = require('./index');

let raiClient = client({
    rai_node_host: 'http://127.0.0.1:7076'
});

let account = 'xrb_3xmhxujshtt51npreosm4afcy5gge31q9wryf571jbtwky8i99pstuamxsob';

raiClient.account_balance({ account: account }).then(balance => {
    return raiClient.mrai_from_raw({ amount: balance.balance }).then(mrai => {
        console.log('Account', account, 'has', mrai.amount, 'raiblocks!');
    });
});
```

### Available commands

https://github.com/clemahieu/raiblocks/wiki/RPC-protocol