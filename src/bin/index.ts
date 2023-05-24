#!/usr/bin/env node

import path from 'path'
import alias from 'module-alias'
import packageConfig from '../../package.json'

alias(path.resolve(__dirname, '../../'))

import { Command } from 'commander'

import internallyCommand from './internally'

import { initExtraPack } from './extra'

const program = new Command(packageConfig.commandName)

export interface ICommand {
  description: string
  command: string
  action: (value?: any) => void
}

const initCommand = (commandConfig: ICommand[]) => {
	commandConfig.forEach(config => {
		const { description, command, action } = config
		program
			.version(packageConfig.version)
			.description(description)
			.command(command)
			.action((value) => {
				action(value)
			})
	})
}

const init = () => {
	const extraPacks = initExtraPack()
	initCommand([...internallyCommand, ...extraPacks])
}

init()

program.parse(process.argv)
