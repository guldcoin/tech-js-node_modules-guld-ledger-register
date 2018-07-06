# guld-fs

Guld file system abstraction module.

### Install

```
npm i guld-fs
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
