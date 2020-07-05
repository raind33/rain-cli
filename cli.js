#!/usr/bin/env node

const inquirer = require('inquirer')
const path = require('path')
const fs = require('fs')
const ejs = require('ejs')

inquirer.prompt([
  {
    type: 'input',
    name: 'name',
    message: 'Project name'
  }
]).then(ansers => {
  const templ = path.join(__dirname, 'templates')
  const desDir = process.cwd()
  fs.readdir(templ, (err, files) => {
    if (err) throw err
    files.forEach(file => {
      ejs.renderFile(path.join(templ, file), ansers, (err, result) => {
        if (err) throw err
        fs.writeFileSync(path.join(desDir, file), result)
      })
    })
  })
})