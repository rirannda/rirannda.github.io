import { goto } from "$app/navigation";
import { resolve } from "$app/paths";
import { terminal } from "$lib/state/terminalState.svelte";
import { os } from "$lib/state/osState.svelte";

export async function parseCommand(input: string, Path: string) {
    // 空白で分割（連続する空白にも対応させるなら正規表現 /\s+/ が便利です）
    const args = input.trim().split(/\s+/);
    const command = args[0];
    switch (command) {
        case 'help':
            return { response: 'Available commands: help, clear, echo, cd, pwd, whoami, date' };
        case 'echo':
            return { response: args.slice(1).join(' ') };
        case 'cd':
            {
                const target = args[1];
                if (!target || target === '~' || target === '/') {
                    await goto(resolve('/'));
                    return { response: '' };
                }
                if (target === 'about') {
                    await goto(resolve('/about'));
                    return { response: '' };
                }
                if (target === 'projects') {
                    await goto(resolve('/projects'));
                    return { response: '' };
                }
                if (target === 'skills') {
                    await goto(resolve('/skills'));
                    return { response: '' };
                }
                return { response: `cd: no such file or directory: ${target}`, isError: true };
            }
        case 'pwd':
            return { response: String(Path) };
        case 'clear':
            terminal.clearOutput();
            return { response: '' };
        case 'whoami':
            return { response: 'visitor' };
        case 'date':
            return { response: new Date().toString() };
        case 'uname':
            return { response: 'Folix' };
        case 'reboot':
            os.setRebooting(true);
            return { response: 'Broadcast message from system: System is going down for reboot NOW!' };
        default:
            return { response: `Command not found: ${command}`, isError: true };
    }
}