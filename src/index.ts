import chalk from "chalk";
import inquirer from "inquirer";

type types =
    | "input"
    | "number"
    | "password"
    | "list"
    | "rawlist"
    | "expand"
    | "checkbox"
    | "confirm"
    | "editor";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function prompter(
    prompt: string,
    type: types,
    data: { choices?: string[]; default?: string | boolean | number } = {}
) {
    const promptObject = {
        name: "answer",
        message: prompt,
        type,
        ...data,
    };
    const { answer } = await inquirer.prompt(promptObject);
    return answer;
}

interface Data {
    name: string;
    typescript: "Strict" | "Loose" | "None";
    eslint: "Strict" | "Loose" | "None";
    database: "None" | "Drizzle" | "Prisma";
    prettier: boolean;
    outDir: string;
    git: boolean;
    type: "default" | "Website (t3)" | "discord.js";
    packageManager: "npm" | "yarn" | "pnpm";
}

async function prompt() {
    const data: Data = {
        name: await prompter(
            "What would you like the project name to be?",
            "input",
            { default: "my-clicks-project" }
        ),
        type: await prompter(
            "What type of project would you like to create?",
            "list",
            {
                choices: ["default", "Website (t3)", "discord.js"],
                default: "default",
            }
        ),
        database: await prompter(
            "What type of database would you like to use?",
            "list",
            { choices: ["None", "Drizzle", "Prisma"], default: "None" }
        ),
        packageManager: await prompter(
            "What package manager would you like to use?",
            "list",
            { choices: ["npm", "yarn", "pnpm"], default: "pnpm" }
        ),
        typescript: await prompter(
            "How strict would you like typescript to be?",
            "list",
            { choices: ["Strict", "Loose", "None"], default: "Strict" }
        ),
        eslint: await prompter(
            "How strict would you like eslint to be?",
            "list",
            {
                choices: ["Strict", "Loose", "None"],
                default: "Strict",
            }
        ),
        prettier: await prompter("Would you like to use prettier?", "confirm", {
            default: true,
        }),
        outDir: await prompter(
            "What would you like the output directory to be?",
            "input",
            { default: "dist" }
        ),
        git: await prompter(
            "Would you like to initialize a git repository?",
            "confirm",
            { default: true }
        ),
    };
    return data;
}

async function parse(data: Record<keyof Data, string | boolean>) {
    await sleep(100);
    console.log(chalk.green("Creating project..."));
    console.log(chalk.green("Project name: ") + chalk.blue(data.name));
}

(async () => {
    const data = await prompt();
    await parse(data);
})();
