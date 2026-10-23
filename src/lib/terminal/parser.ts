import { goto } from '$app/navigation';
import { resolve } from '$app/paths';
import { terminal, type TerminalLine } from '$lib/state/terminalState.svelte';
import { os } from '$lib/state/osState.svelte';
import { theme } from '$lib/state/themeState.svelte';
import { langState } from '$lib/state/langState.svelte';
import { dict } from '$lib/i18n/dict';
import { availableCommands, helpTexts, type CommandName } from './helpTexts';
import {
	findProject,
	isDirectory,
	listDirectory,
	portfolioHome,
	readPortfolioFile,
	resolvePortfolioPath
} from './filesystem';

export { availableCommands } from './helpTexts';
export { availableDirs } from './filesystem';

export type CommandResult = {
	response: string | string[];
	isError?: boolean;
	skipOutput?: boolean;
	historyEntries?: TerminalLine['historyEntries'];
	action?: { type: 'open'; url: string };
};

function getHelpText(command: string): CommandResult {
	if (!Object.hasOwn(helpTexts, command)) {
		return { response: `No help available for '${command}'.` };
	}
	const help = helpTexts[command as CommandName];
	return { response: [`Usage: ${help.usage}`, help.description[langState.current]] };
}

const noArgumentsCommands = new Set([
	'pwd',
	'clear',
	'reset',
	'history',
	'whoami',
	'date',
	'uname',
	'reboot',
	'su',
	'fakefetch',
	'welcome',
	'thanks',
	'exit'
]);

export async function parseCommand(input: string, currentPath: string): Promise<CommandResult> {
	const tokens = (input.trim().match(/"[^"]*"|'[^']*'|\S+/g) ?? []).map((token) =>
		/^(["']).*\1$/s.test(token) ? token.slice(1, -1) : token
	);
	const [command, ...args] = tokens;
	if (!command) return { response: '', skipOutput: true };
	if (!Object.hasOwn(helpTexts, command)) {
		return { response: `Command not found: ${command}`, isError: true };
	}

	if (args.includes('-h') || args.includes('--help')) return getHelpText(command);
	if (command !== 'echo' && command !== 'sudo' && args.some((arg) => arg.startsWith('-'))) {
		return {
			response: `The '${command}' command does not take any options. Usage: ${helpTexts[command as CommandName].usage}`,
			isError: true
		};
	}
	if (args.length > 0 && noArgumentsCommands.has(command)) {
		return { response: `The '${command}' command does not take any arguments.`, isError: true };
	}

	switch (command) {
		case 'help': {
			if (args.length === 0) {
				return {
					response: [
						`${dict[langState.current].terminal.available}: ${availableCommands.join(', ')}`
					]
				};
			}
			return { response: args.flatMap((name) => [getHelpText(name).response, ''].flat()) };
		}
		case 'echo':
			return { response: args.join(' ') };
		case 'cd': {
			if (args.length > 1) return { response: 'cd: too many arguments', isError: true };
			const target = args[0] || '/';
			const path = resolvePortfolioPath(target, currentPath);
			if (['/root', '/etc', '/var', '/usr'].includes(path)) {
				return { response: `cd: permission denied: ${target}`, isError: true };
			}
			if (!isDirectory(path)) {
				return { response: `cd: no such file or directory: ${target}`, isError: true };
			}
			if (path !== resolvePortfolioPath('.', currentPath)) {
				if (path === '/projects') await goto(resolve('/works'), { keepFocus: true });
				else if (path === '/') await goto(resolve('/#top'), { keepFocus: true });
				else await goto(resolve(`/#${path.slice(1)}`), { keepFocus: true });
			}
			terminal.currentPath = path;
			return { response: '' };
		}
		case 'ls': {
			if (args.length > 1) return { response: 'ls: too many arguments', isError: true };
			const target = args[0] || '.';
			const listing = listDirectory(resolvePortfolioPath(target, currentPath));
			return listing
				? { response: listing }
				: { response: `ls: cannot access '${target}': No such file or directory`, isError: true };
		}
		case 'cat': {
			if (args.length === 0) return { response: 'Usage: cat <name|path> [...]', isError: true };
			const response: string[] = [];
			let isError = false;
			for (const target of args) {
				const contents = readPortfolioFile(target, currentPath, langState.current);
				if (response.length) response.push('');
				if (contents) response.push(...contents);
				else {
					response.push(`cat: ${target}: No such file or directory`);
					isError = true;
				}
			}
			return { response, isError };
		}
		case 'pwd':
			return {
				response:
					portfolioHome +
					(resolvePortfolioPath('.', currentPath) === '/'
						? ''
						: resolvePortfolioPath('.', currentPath))
			};
		case 'clear':
		case 'reset':
			terminal.clearOutput();
			return { response: '', skipOutput: true };
		case 'history': {
			const historyEntries = terminal.history.map((command, index) => ({
				number: index + 1,
				command
			}));
			return {
				response: historyEntries.length
					? historyEntries.map((entry) => `${entry.number}  ${entry.command}`)
					: dict[langState.current].terminal.historyEmpty,
				historyEntries
			};
		}
		case 'lang': {
			if (args.length !== 1 || (args[0] !== 'ja' && args[0] !== 'en')) {
				return { response: 'Usage: lang <ja|en>', isError: true };
			}
			langState.setLanguage(args[0]);
			return { response: dict[langState.current].terminal.languageChanged };
		}
		case 'whoami':
			return { response: 'visitor' };
		case 'date':
			return { response: new Date().toString() };
		case 'uname':
			return { response: 'Folix' };
		case 'reboot':
			os.setRebooting(true);
			return { response: 'Broadcast message from system: System is going down for reboot NOW!' };
		case 'sudo':
			return {
				response: args.length
					? 'sudo: visitor is not in the sudoers file. This incident will not be reported.'
					: 'Usage: sudo [command]'
			};
		case 'su':
			return { response: 'su: permission denied' };
		case 'fakefetch':
			return {
				response: [
					' ********    *******    **        **  **     **    visitor@Folix',
					'/**/////    **/////**  /**       /** //**   **     -------------',
					'/**        **     //** /**       /**  //** **      OS: PortfoliOS Folix web edition',
					'/*******  /**      /** /**       /**   //***       Host: Web Browser',
					'/**////   /**      /** /**       /**    **/**      Kernel: Folix 0.0.1',
					`/**       //**     **  /**       /**   ** //**     Theme: ${theme.isDark ? 'Dark' : 'Light'}`,
					'/**        //*******   /******** /**  **   //**    Developer: rirannda',
					'//          ///////    ////////  //  //     //     '
				]
			};
		case 'theme': {
			if (
				args.length !== 1 ||
				(args[0].toLowerCase() !== 'dark' && args[0].toLowerCase() !== 'light')
			) {
				return {
					response: `theme: invalid mode ${args.join(' ')}. Usage: theme <light|dark>`,
					isError: true
				};
			}
			const mode = args[0].toLowerCase() as 'light' | 'dark';
			theme.setTheme(mode);
			return { response: `Theme changed to ${mode} mode.` };
		}
		case 'welcome':
			return { response: dict[langState.current].terminal.welcome };
		case 'open': {
			if (args.length < 1 || args.length > 2) {
				return { response: `Usage: ${helpTexts.open.usage}`, isError: true };
			}
			const target = args[0].toLowerCase();
			const links: Record<string, string> = {
				github: 'https://github.com/rirannda',
				discord: 'https://discord.com/users/924197940103372831'
			};
			if (Object.hasOwn(links, target) && args.length === 1) {
				return { response: `Opening ${target} ...`, action: { type: 'open', url: links[target] } };
			}
			const project = findProject(target);
			if (project && (!args[1] || args[1] === 'repo' || args[1] === 'demo')) {
				const url = args[1] === 'demo' ? project.demoUrl : project.repoUrl;
				return url
					? { response: `Opening ${project.name} ...`, action: { type: 'open', url } }
					: { response: `open: no demo configured for '${project.id}'`, isError: true };
			}
			return { response: `open: unknown target '${args.join(' ')}'`, isError: true };
		}
		case 'thanks':
			return {
				response:
					'Inspired by the amazing dev community. Thank you to all creators who share their code and ideas!'
			};
		case 'exit':
			terminal.isTerminalEnabled = false;
			return { response: '' };
		default:
			return { response: `Command not found: ${command}`, isError: true };
	}
}
