// import chalk from 'chalk';
import inquirer from 'inquirer';


// const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function typescriptType() {
    const { level } = await inquirer.prompt({
        name: 'level',
        message: 'How strict would you like typescript to be?',
        type: 'list',
        choices: ['Strict', 'Loose', 'None'],
        default: 'Strict'
    });
    return level;
}
async function eslintType() {
    const { level } = await inquirer.prompt({
        name: 'level',
        message: 'How strict would you like eslint to be?',
        type: 'list',
        choices: ['Strict', 'Loose', 'None'],
        default: 'Strict'
    });
    return level;
}
async function prettierType() {
    const { level } = await inquirer.prompt({
        name: 'level',
        message: 'How strict would you like prettier to be?',
        type: 'list',
        choices: ['Strict', 'Loose', 'None'],
        default: 'Strict'
    });
    return level;
}
async function outDir() {
    const { dir } = await inquirer.prompt({
        name: 'dir',
        message: 'What would you like the output directory to be?',
        type: 'input',
        default: 'dist'
    });
    return dir;
}
async function git() {
    const { git } = await inquirer.prompt({
        name: 'git',
        message: 'Would you like to initialize a git repository?',
        type: 'confirm',
        default: true
    });
    return git;
}

interface Data {
    typescript: string;
    eslint: string;
    prettier: string;
    outDir: string;
    git: boolean;
    discord: boolean;
    website: boolean;
}

async function prompt() {
    const data: Data = {
        typescript: await typescriptType(),
        eslint: await eslintType(),
        prettier: await prettierType(),
        outDir: await outDir(),
        git: await git(),
        discord: process.argv.includes('--discord'),
        website: process.argv.includes('--website')
    }
    return data;
}

async function parse(data: Record<keyof Data, string | boolean>) {
    console.log(data);
}

(async () => {
    const data = await prompt();
    await parse(data)
})();