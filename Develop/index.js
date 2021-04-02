// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const { report } = require('process');
// const { prompts } = require('inquirer');
// TODO: Create an array of questions for user input
const questions = [];
const prompts = [
    {
        type: 'input',
        message: 'What is the project title?',
        name: 'title'
    },
    {
        type: 'input',
        message: 'What is the product descrition? (motivation, why, what does it solve, lessons learned',
        name: 'description'
    },
    {
        type: 'input',
        message: 'Installation instructions?',
        default: 'Clone repository and install dependencies: npm init, npm install',
        name: 'install'
    },
    {
        type: 'confirm',
        message: 'Are you hosting this site on Github?',
        name: 'hostgithub'
    },
    {
        type: 'input',
        message: 'What is the github reponame?',
        name: 'repo',
        when: (answers) => answers.hostgithub === true 
    },
    {
        type: 'input',
        message: 'What is the live site URL?',
        prefix: 'https://',
        name: 'url',
        when: (answers) => answers.hostgithub === false 
    },
    {
        type: 'input',
        message: 'Usage instructions / instructions?',
        name: 'usage'
    },
    {
        type: 'input',
        message: 'Any people to credit?',
        name: 'credits'
    },
    {
        type: 'list',
        message: 'What License?',
        choices: ['Apache', 'Eclipse', 'MIT', 'Mozilla', 'WTFPL', 'Other', 'None' ],
        name: 'license'
    },
    {
        type: 'input',
        message: 'Enter free form License name:',
        name: 'fflicense',
        when: (answers) => answers.license === 'Other' 
    },
    {
        type: 'input',
        message: 'Project Features?',
        name: 'features'
    },
    {
        type: 'input',
        message: 'How to contrubute?',
        default: 'Feel free to fork and make pull requests.',
        name: 'contribute'
    },
    {
        type: 'input',
        message: 'Existing tests?',
        default: 'There are no automted test for this project at this time.',
        name: 'tests'
    }
]
// TODO: Create a function to write README file
function writeToFile(fileName, data) {}

// TODO: Create a function to initialize app
function init() {
    inquirer.prompt(prompts)
    .then((response) => {
        const { title, description, install, hostgithub, repo, url, usage, credits, license, fflicense, features, contribute, tests } = response;
        var gurl = ""
        var thelicense = ""
        var badgeURL = ""
        if(hostgithub === true) {
            gurl = "https://mark-artim.github.io/"+repo;
        } else {
            gurl = url;
        };
        if(fflicense) {
            thelicense = fflicense;
        } else {
            thelicense = license;
            badgeURL = getBadge(license);
        };
        const content =
        `# ${title}
        
## Description
${description}

${badgeURL}
        
## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## Installation
${install}

Live site URL: ![${description}](${gurl})

## Usage
${usage}

## Credits
${credits}

## License
${thelicense}

## Features
${features}

## How to Contribute
${contribute}

## Tests
${tests}
        `
        console.log(title, description);
        console.log(content);
        fs.writeFile('README.md', content, (err) =>
         err ? console.error(err) : console.log('README.md created!'))
    });
}

function getBadge(license) {
    var licTest = license;
    console.log('in getBadge license is '+license+' and licTest is '+licTest)
    switch (licTest) {
        case 'Apache':
            badgeURL = '[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)';
            console.log('badgeURL is '+badgeURL);
            return badgeURL;
            break
        default:
            badgeURL = 'Somethign very bad happened';
        console.log('badgeURL is '+badgeURL);
        return badgeURL;
    };
};

// Function call to initialize app
init();

// BAck Up Stuff JSON.stringify(response)
// https://mark-artim.github.io/

