import { resolve } from 'path'
import chalk from 'chalk'

// 项目本地路径
export const getDirPath = (relPath = '') => {
	return resolve(__dirname, relPath)
}

// 获取运行路径
export const getCwdPath = (relPath = '') => {
	return resolve(process.cwd(), relPath)
}

// 计时日志
export const loggerTiming = (str = '', start = true) => {
	if (start) {
		console.time('Timing')
		console.log(chalk.cyan(`****** ${str} START ******`))
	} else {
		console.log(chalk.cyan(`****** ${str} END ******`))
		console.timeEnd('Timing')
	}
}

// 普通日志
export const loggerInfo = (str = '') => {
	console.log(chalk.green(`[INFO]： ${str}`))
}

// 警告日志
export const loggerWarring = (str = '') => {
	console.log(chalk.yellowBright(`[WARRING]： ${str}`))
}

// 成功日志
export const loggerSuccess = (str = '') => {
	console.log(chalk.greenBright(`[SUCCESS]： ${str}`))
}

// 报错日志
export const loggerError = (str = '') => {
	console.log(chalk.redBright(`[ERROR]： ${str}`))
}