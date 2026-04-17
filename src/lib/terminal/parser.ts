import { goto } from "$app/navigation";
import { resolve } from "$app/paths";
import { terminal } from "$lib/state/terminalState.svelte";
import { os } from "$lib/state/osState.svelte";
import { theme } from "$lib/state/themeState.svelte";
import { helpTexts } from "./helpTexts";


async function getHelpText(command: string) {
    const text: string | string[] = helpTexts[command];
    return { response: text || `No help available for '${command}'.` };
}

export async function parseCommand(input: string, Path: string) {
    // 空白で分割（連続する空白にも対応させるなら正規表現 /\s+/ が便利です）
    const tokens = input.trim().split(/\s+/);
    if (tokens.length === 1) { tokens.push(''); } // コマンドのみの場合、tokens[1]がundefinedになるのを防ぐため空文字を追加
    const command = tokens[0];
    const options: string[] = [];
    const args: string[] = []; // argsは必ずlength > 1 (''をpushしてあるため)

    const noOptionCommands: Readonly<Record<string, string>> = {
        'help': 'help [command]',
        'echo': 'echo [text]',
        'cd': 'cd [directory]',
        'ls': 'ls [directory]',
        'pwd': 'pwd',
        'reset': 'reset',
        'whoami': 'whoami',
        'date': 'date',
        'reboot': 'reboot',
        'sudo': 'sudo [command]',
        'su': 'su',
        'theme': 'theme <light|dark>',
        'fakefetch': 'fakefetch',
        'welcome': 'welcome'
    };
    const noArgumentsCommands = new Set(['reset', 'whoami', 'date', 'uname', 'reboot', 'fakefetch', 'welcome']);


    for (let i = 1; i < tokens.length; i++) { // tokensのうち最初の要素(コマンド)以外を処理
        const t = tokens[i];
        if (t.startsWith('-')) {
            options.push(t);
        } else {
            args.push(t);
        }
    }

    if (options.includes('-h') || options.includes('--help')) {
        return getHelpText(command);
    }

    if (options.length > 0 && !(command in noOptionCommands)) {
        return { response: `The '${command}' command does not take any options. Usage: ${noOptionCommands[command] || 'No usage information available.'}`, isError: true };
    }
    if (args.length > 0 && noArgumentsCommands.has(command)) {
        return { response: `The '${command}' command does not take any arguments.`, isError: true };
    }

    switch (command) {
        case 'help':
            {
                // 引数がない場合 (argsが [''] のみの場合)
                if (args.length === 1 && args[0] === '') {
                    return { response: 'Available commands: help, cd, date, echo, fakefetch, ls, pwd, reboot, reset, uname, welcome, whoami' };
                }

                const combinedHelpTexts: string[] = [];

                // 引数に指定されたコマンドを順番に処理する
                for (let index = 0; index < args.length; index++) {
                    const targetCmd = args[index];
                    if (targetCmd === '') continue; // 空文字の場合はスキップ

                    // 1. await を付けて結果を待つ
                    const helpResult = await getHelpText(targetCmd);

                    // 2. 結果が配列(複数行)か文字列(1行)かで処理を分ける
                    if (Array.isArray(helpResult.response)) {
                        combinedHelpTexts.push(...helpResult.response); // 配列を展開して追加
                    } else {
                        combinedHelpTexts.push(String(helpResult.response)); // そのまま追加
                    }

                    // コマンドとコマンドの間に空行を挟む
                    combinedHelpTexts.push('');
                }

                return { response: combinedHelpTexts };
            }
        case 'echo':
            return { response: args.join(' ') };
        case 'cd':
            {
                if (args.length > 1) {
                    return { response: `cd: too many arguments`, isError: true };
                }
                let target = (args[0] == '') ? '/' : args[0];
                if (target.startsWith('/home/visitor/portfolio') || target.startsWith('/home/visitor/portfolio/')) {
                    target = target.replace('/home/visitor/portfolio', '/'); // カレントディレクトリを表す部分を削除
                }
                if ((target.endsWith('/')) && (target !== '/')) {
                    target = target.replace(/\/+$/, ''); // パスの末尾のスラッシュを削除
                }

                if (!target || target === '~' || target === '/') {
                    await goto(resolve('/'));
                    return { response: '' };
                }
                if (target == 'about' || target == '/about') {
                    await goto(resolve('/about'));
                    return { response: '' };
                }
                if (target == 'projects' || target == '/projects') {
                    await goto(resolve('/projects'));
                    return { response: '' };
                }
                if (target == 'skills' || target == '/skills') {
                    await goto(resolve('/skills'));
                    return { response: '' };
                }
                if (target == 'root' || target == 'etc' || target == 'var' || target == 'usr' || target == '/root' || target == '/etc' || target == '/var' || target == '/usr') {
                    return { response: `cd: permission denied: ${target}`, isError: true };
                }
                return { response: `cd: no such file or directory: ${target}`, isError: true };
            }
        case 'ls':
            {
                if (args.length > 1) {
                    return { response: `ls: too many arguments`, isError: true };
                }

                let target = (args[0] == '') ? '.' : args[0];

                if (target.startsWith('/home/visitor/portfolio') || target.startsWith('/home/visitor/portfolio/')) {
                    target = target.replace('/home/visitor/portfolio', '/'); // カレントディレクトリを表す部分を削除
                }
                if ((target.endsWith('/')) && (target !== '/')) {
                    target = target.replace(/\/+$/, ''); // パスの末尾のスラッシュを削除
                }

                if ((Path == '' && target == '.') || target == '/') {
                    return { response: ['about projects skills'] };
                }
                if ((Path == '/about' && target == '.') || target == '/about' || Path == '' && target == 'about') {
                    return { response: ['+page.svelte'] };
                }
                if ((Path == '/projects' && target == '.') || target == '/projects' || Path == '' && target == 'projects') {
                    return { response: ['+page.svelte'] };
                }
                if ((Path == '/skills' && target == '.') || target == '/skills' || Path == '' && target == 'skills') {
                    return { response: ['+page.svelte'] };
                }
                return { response: `ls: cannot access '${target}': No such file or directory`, isError: true };
            }
        case 'pwd':
            return { response: 'home/visitor/portfolio' + Path };
        case 'reset':
            terminal.clearOutput();
            return { response: '' };
        case 'whoami':
            return { response: 'visitor' };
        case 'date':
            return { response: new Date().toString() };
        case 'uname': // ToDo! add options...

            return { response: 'Folix' };
        case 'reboot':
            os.setRebooting(true);
            return { response: 'Broadcast message from system: System is going down for reboot NOW!' };
        case 'sudo':
            return { response: 'sudo: visitor is not in the sudoers file. This incident will not be reported.' };
        case 'su':
            return { response: 'su: permission denied' };
        case 'fakefetch':
            return {
                response: [
                    " ********   *******   **       ** **     **   visitor@Folix",
                    '/**/////   **/////** /**      /**//**   **    -------------',
                    '/**       **     //**/**      /** //** **     OS: PortfoliOS Folix web edition',
                    '/******* /**      /**/**      /**  //***      Host: Web Browser',
                    '/**////  /**      /**/**      /**   **/**     Kernel: Folix 0.0.1',
                    `/**      //**     ** /**      /**  ** //**    Theme: ${theme.isDark ? 'Dark' : 'Light'}`,
                    '/**       //*******  /********/** **   //**   Developer: gorirari',
                    '//         ///////   //////// // //     //    ',
                ]
            };
        case 'theme': {
            if (args.length > 1) {
                return { response: `theme: too many arguments. Usage: theme <light|dark>`, isError: true };
            }
            const mode = args[0]?.toLowerCase();

            if (mode === 'dark') {
                theme.setTheme('dark');
                return { response: 'Theme changed to dark mode.' };
            } else if (mode === 'light') {
                theme.setTheme('light');
                return { response: 'Theme changed to light mode.' };
            } else {
                return {
                    response: `theme: invalid mode ${mode || ''}. Usage: theme <light|dark>`,
                    isError: true
                };
            }
        }
        case 'welcome':
            return {
                response: [
                    "Welcome to the portfolio of gorirari!",
                    "Type 'help' to see the list of available commands.",
                    "Feel free to explore and have fun!"
                ]
            };
        default:
            return { response: `Command not found: ${command}`, isError: true };
    }
}