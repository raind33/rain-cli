#! /usr/bin/env node

const inquirer = require('inquirer')
const path = require('path')
const { existPath, isDir, isFile } = require('./utils')
const fs = require('fs')
const ejs = require('ejs')
const chalk = require('chalk')
const error = chalk.red
const warning = chalk.keyword('orange')
const root = process.cwd()
const program = require('commander')
const download = require('download')
const templ = path.join(__dirname, '../', 'templates')
const ora = require('ora')
const axios = require('axios')
const request = require('request')
const url = 'github:raind33/vue3-project'
const TEMPLATE_TYPE = {
  COMPONENT: ['table', 'table2', 'HelloWorld'],
}
let dirname, templateType
let question = [
  {
    name: 'name',
    type: 'list',
    message: 'template name',
    choices: TEMPLATE_TYPE.COMPONENT,
  },
  {
    name: 'dirname',
    type: 'input',
    message: 'storage path',
    validate(val) {
      if (val === '') return 'path is required!'
      if (!existPath(path.join(root, val))) return "path doesn't exist"
      if (!isDir(path.join(root, val))) return 'please input dirname'
      dirname = val
      return true
    },
  },
  {
    name: 'filename',
    type: 'input',
    message: 'filename',
    validate(val) {
      if (val === '') return 'filename is required!'
      if (existPath(path.join(root, `${dirname}/${val}`))) {
        return 'file already exists, please input again!'
      }
      return true
    },
    filter(val) {
      if (!path.extname(val)) {
        return val + '.vue'
      }
      return val
    },
  },
]

program
  .version(require('../package').version)
  .command('add <type>')
  .description('add component  to dirname')
  .action(function (type, cmd) {
    templateType = type.toUpperCase()
    if (!TEMPLATE_TYPE[templateType]) {
      console.log(error('当前命令不存在'))
      return
    }
    inquirer.prompt(question).then( async (answers) => {
      // fs.readdir(templ, (err, files) => {
      //   if (err) throw err
      //   files.forEach(file => {
      //     fileObj = path.parse(file)
      //     if (fileObj.name === answers.name) {
      //       ejs.renderFile(path.join(templ, file), answers, (err, result) => {
      //         if (err) throw err
      //         fs.writeFileSync(path.join(root, answers.dirname, answers.filename), result)
      //       })
      //     }
      //   })
      // })
      // 出现加载图标
      // const spinner = ora("Downloading...");
      // spinner.start();
      // download (
      //   url,
      //   path.join(root, answers.dirname),
      //   err => {
      //   if (err) {
      //     spinner.fail();
      //    console.log(chalk.red(`Generation failed. ${err}`))
      //    return
      //   }
      //   // 结束加载图标
      //   spinner.succeed();
      //   console.log(chalk.green('\n Generation completed!'))
      //   console.log('\n To get started')
      //   console.log(`\n cd ${projectName} \n`)
      //   }
      //  )
      let stream = fs.createWriteStream(path.join(root, 'c.png'))
      download('https://pic.cnblogs.com/avatar/761080/20160908202438.png').pipe(stream)
      console.log('\n')
      console.log(chalk.green('Added successfully!\n'))
    })
  })

program.parse(process.argv)
