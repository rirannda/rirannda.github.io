export type Tech = {
	id: string;
	label: string;
	color: `#${string}`;
	textColor?: `#${string}`;
	// フォント文字、またはローカル / CDN の SVG URL。
	icon: string | { src: string };
};

export const techs = [
	{ id: 'html', label: 'HTML', color: '#e44c20', icon: '' },
	{ id: 'typescript', label: 'TypeScript', color: '#3577c4', icon: '' },
	{ id: 'javascript', label: 'JavaScript', color: '#f6df1f', icon: '' },
	{ id: 'css', label: 'CSS', color: '#673299', icon: '' },
	{
		id: 'python',
		label: 'Python',
		color: '#fed34d',
		textColor: '#3971a1',
		icon: ''
	},
	{ id: 'rust', label: 'Rust', color: '#e43616', icon: '' },
	{ id: 'svelte', label: 'Svelte', color: '#ff4000', icon: '' },
	{ id: 'react', label: 'React', color: '#59c3db', icon: '' },
	{ id: 'git', label: 'Git', color: '#f34e28', icon: '' },
	{ id: 'nodejs', label: 'Node.js', color: '#6bbf47', icon: '' },
	{ id: 'windows', label: 'Windows', color: '#0079d5', icon: '' },
	{ id: 'linux', label: 'Linux', color: '#ffffff', icon: '' },
	{ id: 'archlinux', label: 'Arch Linux', color: '#0088cc', icon: '' },
	{ id: 'vscode', label: 'VS Code', color: '#22acf3', icon: '' },
	{ id: 'typst', label: 'Typst', color: '#289cab', icon: '' },
	{ id: 'github', label: 'GitHub', color: '#8250df', icon: '' },
	{ id: 'docker', label: 'Docker', color: '#2560ff', icon: '' },
	{ id: 'tailwind', label: 'Tailwind CSS', color: '#01bbff', icon: '󱏿' },
	{ id: 'arduino', label: 'Arduino', color: '#25c2c7', icon: '' },
	{ id: 'wsl', label: 'WSL', color: '#0272ca', icon: '' },
	{ id: 'cpp', label: 'C++', color: '#6295cb', icon: '' },
	{
		id: 'leaflet',
		label: 'Leaflet.js',
		color: '#199900',
		icon: { src: '/icons/tech/leaflet.svg' }
	},
	{
		id: 'scratch',
		label: 'Scratch',
		color: '#f9a83a',
		textColor: '#1e1e1e',
		icon: { src: '/icons/tech/scratch.svg' }
	}
] as const satisfies readonly Tech[];

export type TechId = (typeof techs)[number]['id'];

const techById = new Map<TechId, Tech>(techs.map((tech) => [tech.id, tech]));

export function getTech(id: TechId): Tech {
	const tech = techById.get(id);
	if (!tech) throw new Error(`Unknown technology: ${id}`);
	return tech;
}

// ヘッダーなど、カード以外でも同じ HEX 値を参照するための CSS 変数。
export const techColorStyles = techs.map((tech) => `--tech-${tech.id}: ${tech.color}`).join('; ');
