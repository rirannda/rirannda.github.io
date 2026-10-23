import type { LocalizedText } from '../data/works';

type CommandHelp = { usage: string; description: LocalizedText };

export const helpTexts = {
	help: {
		usage: 'help [command]',
		description: {
			ja: 'コマンド一覧、または指定したコマンドの説明を表示します。',
			en: 'Lists commands or shows help for a command.'
		}
	},
	echo: {
		usage: 'echo [text]',
		description: { ja: '指定した文字列を表示します。', en: 'Displays the specified text.' }
	},
	cd: {
		usage: 'cd [directory]',
		description: {
			ja: '指定した場所へ移動します。例: cd projects / cd ~/portfolio/about / cd ..',
			en: 'Navigates to a directory. Examples: cd projects / cd ~/portfolio/about / cd ..'
		}
	},
	ls: {
		usage: 'ls [directory]',
		description: {
			ja: '一覧を表示します。ls projectsで作品、ls skillsで技術を確認できます。',
			en: 'Lists a directory. Use ls projects for projects and ls skills for skills.'
		}
	},
	cat: {
		usage: 'cat <name|path> [...]',
		description: {
			ja: '作品・技術・プロフィールの説明を表示します。例: cat typ-hl / cat skills/svelte / cat about.txt',
			en: 'Reads a project, skill, or profile. Examples: cat typ-hl / cat skills/svelte / cat about.txt'
		}
	},
	pwd: {
		usage: 'pwd',
		description: { ja: '現在の場所を表示します。', en: 'Prints the current directory.' }
	},
	clear: {
		usage: 'clear',
		description: {
			ja: 'ターミナルの出力を消します。実行履歴は残ります。',
			en: 'Clears terminal output and keeps command history.'
		}
	},
	reset: {
		usage: 'reset',
		description: {
			ja: 'clearの別名です。ターミナルの出力を消します。',
			en: 'Alias for clear. Clears terminal output.'
		}
	},
	history: {
		usage: 'history',
		description: {
			ja: '実行履歴を表示します。項目をクリックすると入力欄へ戻せます。',
			en: 'Lists command history. Click an entry to reuse it in the input.'
		}
	},
	lang: {
		usage: 'lang <ja|en>',
		description: {
			ja: '表示言語を日本語または英語に切り替えます。',
			en: 'Changes the display language to Japanese or English.'
		}
	},
	whoami: {
		usage: 'whoami',
		description: { ja: '現在のユーザー名を表示します。', en: 'Displays the current user name.' }
	},
	date: {
		usage: 'date',
		description: { ja: '現在の日時を表示します。', en: 'Displays the current date and time.' }
	},
	uname: {
		usage: 'uname',
		description: { ja: 'システム名を表示します。', en: 'Displays the system name.' }
	},
	reboot: {
		usage: 'reboot',
		description: {
			ja: '再起動演出の後、ページを読み込み直します。',
			en: 'Plays a simulated reboot and reloads the page.'
		}
	},
	sudo: {
		usage: 'sudo [command]',
		description: {
			ja: '管理者権限の実行を試みます（演出用）。',
			en: 'Attempts to run a command as administrator (simulated).'
		}
	},
	su: {
		usage: 'su',
		description: {
			ja: 'ユーザーの切り替えを試みます（演出用）。',
			en: 'Attempts to switch users (simulated).'
		}
	},
	theme: {
		usage: 'theme <light|dark>',
		description: {
			ja: 'ライトテーマまたはダークテーマに切り替えます。',
			en: 'Changes the page to the light or dark theme.'
		}
	},
	fakefetch: {
		usage: 'fakefetch',
		description: {
			ja: 'neofetch風にシステム情報を表示します。',
			en: 'Displays system information in a style similar to neofetch.'
		}
	},
	welcome: {
		usage: 'welcome',
		description: { ja: 'ウェルカムメッセージを表示します。', en: 'Displays a welcome message.' }
	},
	open: {
		usage: 'open <github|discord|project> [repo|demo]',
		description: {
			ja: 'GitHub・Discord・作品のリンクを開きます。作品はリポジトリが既定です。例: open typ-hl / open portfolio-os demo（デモ登録時）',
			en: 'Opens GitHub, Discord, or a project link. Projects default to their repository. Examples: open typ-hl / open portfolio-os demo (when configured).'
		}
	},
	thanks: {
		usage: 'thanks',
		description: {
			ja: '開発者コミュニティへの感謝を表示します。',
			en: 'Displays a message of thanks to the developer community.'
		}
	},
	exit: {
		usage: 'exit',
		description: { ja: 'ターミナルを閉じます。', en: 'Closes the terminal.' }
	}
} satisfies Record<string, CommandHelp>;

export type CommandName = keyof typeof helpTexts;
export const availableCommands = Object.keys(helpTexts) as CommandName[];
