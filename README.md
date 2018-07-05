# guld-fs

Guld file system abstraction module.

### Install

```
npm i guld-fs
```

### Usage

```
// must be in an async function.
var fs = await getFS()
// Now use fs with promises and extra functions.
fs.mkdirp('/long/non/existing/path/chain')
fs.cpr('/long/non/existing/path/chain', '/tmp/')
```

##### Node

```
const { getFS } = require('guld-fs')
```
