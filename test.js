/* global describe:false it:false */
const assert = require('chai').assert
const { getFS } = require('./index.js')

describe('node', function () {
  it('FSTYPE global set', async function () {
    assert.equal(global.FSTYPE, 'node')
  })
  it('getFS', async function () {
    var fs = await getFS()
    assert.isTrue(fs.hasOwnProperty('cpr'))
    assert.isTrue(fs.hasOwnProperty('mkdirp'))
  })
})
