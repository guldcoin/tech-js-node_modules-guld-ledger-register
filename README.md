# guld-ledger-register

[![source](https://img.shields.io/badge/source-bitbucket-blue.svg)](https://bitbucket.org/guld/tech-js-node_modules-guld-ledger-register) [![issues](https://img.shields.io/badge/issues-bitbucket-yellow.svg)](https://bitbucket.org/guld/tech-js-node_modules-guld-ledger-register/issues) [![documentation](https://img.shields.io/badge/docs-guld.tech-green.svg)](https://guld.tech/lib/guld-ledger-register.html)

[![node package manager](https://img.shields.io/npm/v/guld-ledger-register.svg)](https://www.npmjs.com/package/guld-ledger-register) [![travis-ci](https://travis-ci.org/guldcoin/tech-js-node_modules-guld-ledger-register.svg)](https://travis-ci.org/guldcoin/tech-js-node_modules-guld-ledger-register?branch=guld) [![lgtm](https://img.shields.io/lgtm/grade/javascript/b/guld/tech-js-node_modules-guld-ledger-register.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/b/guld/tech-js-node_modules-guld-ledger-register/context:javascript) [![david-dm](https://david-dm.org/guldcoin/tech-js-node_modules-guld-ledger-register/status.svg)](https://david-dm.org/guldcoin/tech-js-node_modules-guld-ledger-register) [![david-dm](https://david-dm.org/guldcoin/tech-js-node_modules-guld-ledger-register/dev-status.svg)](https://david-dm.org/guldcoin/tech-js-node_modules-guld-ledger-register?type=dev)

Guld ledger register generic.

### Install

##### Node

```sh
npm i guld-ledger-register
```

### Usage

```

// must be in an async function.
var fs = await getFS(pify=true) // pify=false to not pify the returned fs
// Now use fs with optional promises and extra functions.
fs.mkdirp('/long/non/existing/path/chain')
fs.cpr('/long/non/existing/path/chain', '/tmp/')
fs.rimraf('/tmp/')
```

##### Node

```
const { getFS } = require('guld-fs')
```

### License

MIT Copyright isysd
