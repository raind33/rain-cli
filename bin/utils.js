const path = require('path')
const fs = require('fs')
exports.existPath = (path) => {
  // console.log(fs.statSync(root, dir).isDirectory())
  return fs.existsSync(path)
}

exports.isDir = (path) => {
  return fs.statSync(path).isDirectory()
}
exports.isFile = (path) => {
  return fs.statSync(path).isFile()
}

