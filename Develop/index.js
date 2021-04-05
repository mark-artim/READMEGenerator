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
        message: 'What is your email address?',
        name: 'email'
    },
    {
        type: 'input',
        message: 'What is your github user name?',
        name: 'github'
    },
    {
        type: 'input',
        message: 'What is the github reponame?',
        name: 'repo', 
    },
    {
        type: 'list',
        message: 'Are you hosting a live site?',
        choices: ['No', 'Yes - On Github', 'Yes - NOT on Github'],
        name: 'livesite'
    },
    {
        type: 'input',
        message: 'What is the live site URL?',
        name: 'url',
        when: (answers) => answers.livesite === 'Yes - NOT on Github' 
    },
    {
        type: 'input',
        message: 'What is the project title?',
        name: 'title'
    },
    {
        type: 'input',
        message: 'What is the product description? (motivation, why, what does it solve',
        name: 'description'
    },
    {
        type: 'input',
        message: 'Installation instructions?',
        default: 'Clone repository and install dependencies: npm init, npm install',
        name: 'install'
    },
    {
        type: 'input',
        message: 'Usage instructions?',
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
        const { email, github, repo, livesite, url, title, description, install, usage, credits, license, fflicense, features, contribute, tests } = response;
        var gurl = "No URL"
        var thelicense = ""
        var badgeURL = ""
        if(livesite === 'Yes - On Github') {
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
- [Questions](#questions)

## Installation
${install}
The github repo can be found at: [!${repo}](https://github.com/${github}/${repo})

Live site URL: ${url}

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


## Questions
If you have any questions please contact me at ${email}
 or visit me at [Github](https://github.com/${github})
        `
        console.log(content);
        fs.writeFile('README.md', content, (err) =>
         err ? console.error(err) : console.log('README.md created!'))
    });
}

function getBadge(license) {
    var licTest = license;
    switch (licTest) {
        case 'Apache':
            badgeURL = '[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)';
            return badgeURL;
            break
        case 'Eclipse':
            badgeURL = '[![License](https://img.shields.io/badge/License-EPL%201.0-red.svg)](https://opensource.org/licenses/EPL-1.0)';
            return badgeURL;
            break
        case 'MIT':
            badgeURL = '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)';
            return badgeURL;
            break    
        case 'Mozilla':
            badgeURL = '[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)';
            return badgeURL;
            break        
        case 'WTFPL':
            badgeURL = '[![License: WTFPL](https://img.shields.io/badge/License-WTFPL-brightgreen.svg)](http://www.wtfpl.net/about/)';
        return badgeURL;
        break
            
        default:
            badgeURL = '';
        return badgeURL;
    };
};

// Function call to initialize app
init();

// BAck Up Stuff JSON.stringify(response)
// https://mark-artim.github.io/

