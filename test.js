const path = require('path')
const fs = require('fs')
// const { existDir } = require('./bin/utils')
let existDir = (dir) => {
  console.log(fs.statSync(path.join(__dirname, dir)).isFile())
  // return fs.existsSync(path.join(__dirname, dir))
}

existDir('bin/cli.js')