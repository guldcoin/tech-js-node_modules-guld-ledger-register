const pify = require('pify')
const global = require('window-or-global')
const BrowserFS = require('browserfs')
const {extraFS, supplimentFS} = require('flexfs')
const ENV = require('guld-env').getJS()
const nodefs = require('fs')
const rimraf = require('rimraf')
var bfsconf = pify(BrowserFS.configure)
var fs
var pfs

if (ENV.startsWith('node')) {
  global.FSTYPE = 'node'
} else if (ENV && ENV.name.startsWith('chrom') && typeof chrome !== 'undefined') {
  global.FSTYPE = 'ChromeStorage'
} else {
  global.FSTYPE = 'LocalStorage'
}

async function getFS (promisify = true) {
  // check for cached global instance
  if (fs === undefined) {
    // attempt to get primary choice of either node fs or chrome storage
    if (global.FSTYPE === 'node') {
      fs = nodefs
    } else if (global.FSTYPE === 'ChromeStorage') {
      fs = await getChromeStorageFS()
      fs.copyFile = supplimentFS.copyFile
    } else {
      fs = await getBrowserFS({
        fs: 'LocalStorage'
      })
      fs.copyFile = supplimentFS.copyFile
    }
    fs.rimraf = rimraf // TODO port this for browserfs
    pfs = pify(fs)
    fs.mkdirp = pfs.mkdirp = extraFS.mkdirp
    fs.cpr = pfs.cpr = extraFS.cpr
    fs.mvr = pfs.mvr = extraFS.mvr
  }
  if (fs && !promisify) return fs
  if (pfs && promisify) return pfs
}

async function getBrowserFS (config = {}) {
  return bfsconf(config).then(async (e) => {
    if (e) throw e
    var fs = pify(BrowserFS.BFSRequire('fs'))
    return fs
  })
}

async function getChromeStorageFS () {
  var config = {
    fs: global.FSTYPE,
    options: {
      'storeType': 'local',
      'cacheSize': 500
    }
  }
  return getBrowserFS(config)
}

module.exports = {
  getFS: getFS,
  getChromeStorageFS: getChromeStorageFS,
  getBrowserFS: getBrowserFS
}
