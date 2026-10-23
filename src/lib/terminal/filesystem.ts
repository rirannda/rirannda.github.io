import { worksData } from '../data/works';
import { skillsData } from '../data/skills';
import { dict } from '../i18n/dict';

export const portfolioHome = '/home/visitor/portfolio';
export const availableDirs = ['top', 'about', 'featured', 'projects', 'skills', 'contact', 'works'];

const directories = new Set(['/', '/about', '/featured', '/projects', '/skills', '/contact']);

/** Sections remain directly accessible from any page; explicit ./ and ../ paths are relative. */
export function resolvePortfolioPath(target: string, currentPath = '/') {
	let path = target || '.';
	if (path === portfolioHome || path.startsWith(`${portfolioHome}/`)) {
		path = path.slice(portfolioHome.length) || '/';
	} else if (path === '~/portfolio' || path.startsWith('~/portfolio/')) {
		path = path.slice('~/portfolio'.length) || '/';
	} else if (path === '~' || path.startsWith('~/')) {
		path = path.slice(1) || '/';
	}

	if (!path.startsWith('/')) {
		const firstPart = path.split('/')[0];
		path = availableDirs.includes(firstPart) ? `/${path}` : `${currentPath}/${path}`;
	}

	const parts: string[] = [];
	for (const part of path.split('/')) {
		if (!part || part === '.') continue;
		if (part === '..') parts.pop();
		else parts.push(part);
	}
	if (parts[0] === 'top') parts.shift();
	if (parts[0] === 'works') parts[0] = 'projects';
	return `/${parts.join('/')}`;
}

export function isDirectory(path: string) {
	return directories.has(path);
}

export function findProject(name: string) {
	const key = name.toLowerCase();
	return worksData.find((work) => work.id.toLowerCase() === key || work.name.toLowerCase() === key);
}

export function findSkill(name: string) {
	const key = name.toLowerCase();
	return skillsData.find(
		(skill) => skill.id.toLowerCase() === key || skill.name.toLowerCase() === key
	);
}

export function listDirectory(path: string): string[] | undefined {
	switch (path) {
		case '/':
			return ['about/ featured/ projects/ skills/ contact/ works/', 'about.txt'];
		case '/projects':
			return worksData.map((work) => work.id);
		case '/featured':
			return worksData.filter((work) => work.isFeatured).map((work) => work.id);
		case '/skills':
			return skillsData.map((skill) => skill.id);
		case '/about':
			return ['about.txt'];
		case '/contact':
			return [];
	}
}

export function readPortfolioFile(target: string, currentPath: string, language: 'ja' | 'en') {
	const path = resolvePortfolioPath(target, currentPath);
	const parts = path.split('/').filter(Boolean);
	const name = parts.at(-1) ?? '';
	const isBareName = !target.includes('/');
	const t = dict[language];

	if (
		(isBareName && name === 'about.txt') ||
		path === '/about.txt' ||
		path === '/about/about.txt'
	) {
		return [
			'Rirannda',
			`${t.about.school} / ${t.about.courseGrade}`,
			t.about.osakaSa,
			t.about.descCourse,
			t.about.descOsakaSa,
			t.about.descPrivate
		];
	}

	const project = findProject(name);
	if (
		project &&
		(isBareName ||
			(parts.length === 2 && parts[0] === 'projects') ||
			(parts.length === 2 && parts[0] === 'featured' && project.isFeatured))
	) {
		return [
			project.name,
			project.description[language],
			`${t.workCard.tech}: ${project.tech.map((tech) => tech.label.replace(/^[^\w]+/u, '')).join(', ')}`,
			...(project.role ? [`${t.workCard.role}: ${project.role[language]}`] : []),
			...(project.highlights ? [`${t.workCard.highlights}: ${project.highlights[language]}`] : []),
			`GitHub: ${project.repoUrl}`,
			...(project.demoUrl ? [`${t.workCard.demo}: ${project.demoUrl}`] : [])
		];
	}

	const skill = findSkill(name);
	if (skill && (isBareName || (parts.length === 2 && parts[0] === 'skills'))) {
		return [
			`${skill.name} (${skill.level[language]})`,
			skill.description[language],
			`${skill.urltext}: ${skill.url}`
		];
	}
}
