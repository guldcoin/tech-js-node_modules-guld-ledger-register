const pify = require('pify')
const global = require('window-or-global')
const BrowserFS = require('browserfs')
const {extraFS, supplimentFS} = require('flexfs')
const ENV = require('guld-env').getEnv()
const nodefs = require('fs')
const rimraf = pify(require('rimraf'))
var bfsconf = pify(BrowserFS.configure)
var fs

if (ENV.startsWith('node')) {
  global.FSTYPE = 'node'
} else if (ENV && ENV.name.startsWith('chrom') && typeof chrome !== 'undefined') {
  global.FSTYPE = 'ChromeStorage'
} else {
  global.FSTYPE = 'LocalStorage'
}

async function getFS () {
  // check for cached global instance
  if (fs) return fs
  // attempt to get primary choice of either node fs or chrome storage
  if (global.FSTYPE === 'node') {
    fs = pify(nodefs)
  } else if (global.FSTYPE === 'ChromeStorage') {
    fs = await getChromeStorageFS()
    fs.copyFile = supplimentFS.copyFile
  } else {
    fs = await getBrowserFS({
      fs: 'LocalStorage'
    })
    fs.copyFile = supplimentFS.copyFile
  }
  fs.mkdirp = extraFS.mkdirp
  fs.cpr = extraFS.cpr
  fs.mvr = extraFS.mvr
  fs.rimraf = rimraf // TODO port this for browserfs
  return fs
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
