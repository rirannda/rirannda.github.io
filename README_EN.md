# PortfoliOS (rirannda's Portfolio)

Please access from [my portfolio website](https://rirannda.github.io).

## About This

This is a portfolio website featuring a terminal-style CUI (Character User Interface).
In addition to standard scrolling and clicking, it includes a gimmick that allows users to navigate the site by entering UNIX-like commands via a command line at the bottom of the screen.

## Tech Stack

- **Framework:** [SvelteKit](https://kit.svelte.dev/) [Svelte 5](https://svelte.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Package Manager:** pnpm
- **Deployment:** GitHub Pages (via GitHub Actions)

## Terminal

Open the terminal with the bottom-right button. The input receives focus automatically;
press Escape or run `exit` to close it. The command buttons run their example directly.

- `ls projects` / `cat typ-hl`: list project IDs and read a project by name, ID, or path.
- `open typ-hl`: open a project's repository; `open <project> demo` uses its optional demo URL.
- `ls skills` / `cat skills/svelte`: list skills and read their descriptions.
- `cat about.txt`: read the profile.
- `lang ja` / `lang en`: switch display language.
- `history`: show numbered commands; click one to put it back in the input.
- `clear` / `reset`: clear output while keeping command history.
- `help`: list all commands.

`cd projects` opens the works page; `works` remains an alias. Relative section names,
absolute paths, and `~/portfolio/` paths share the same navigation behavior.
Tab silently completes a unique match. Up and Down recall command history.

## Special Thanks

"PortfoliOS" was compiled with inspiration from countless developers in the open-source world.
Respect and gratitude to all the creators who publish their brilliant portfolios and code. You guys are the real root users!
