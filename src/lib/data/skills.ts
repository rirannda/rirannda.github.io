export type Skill = {
    id: string;
    logo: string;
    name: string;
    level: 'beginner' | 'intermediate' | 'advanced';
    description: string;
};

export const skillsData: Skill[] = [
    {
        id: 'svelte',
        logo: '',
        name: 'Svelte',
        level: 'intermediate',
        description: '本ポートフォリオサイトの開発などに使用。'
    }
]