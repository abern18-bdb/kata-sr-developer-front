# BdB Angular Template


This directory is a brief example of an [Angular](https://angular.io/) app that can be used for the companie's products.

## Build It For Your Own Team

Right after your new repository has been created based on this template, you need to include the project name inside it.

For that, go ahead and **Find and Replace** _"bbog-dig-dt-angular-template-web-ui"_ with whatever is your new project repo name. Something like _"bbog-something-web-ui"_.

Up until this point, you're ready to start working on your development.

## Commands

As of the `package.json`, you have pretty much all the common `scripts` such as:

```bash
# Install dependencies, needs npm 8.11.0 and node 14.21.1
npm i

# Run locally
npm run start
# or
npm run dev 4201

# Run tests
npm run test

# Run linter
npm run lint
```

## The _".yml"_ files

This project deploys using Github CI A.K.A Github Actions. This means everything you know about CircleCI up until now is gone. Boom. Ciao. Hasta la vista. You serve to a new god.

Before you start making commits and make Github Actions workflows fail because of CI configurations, make sure your team DevOps or most experienced developer validates the contents in the `.github/workflows/*.yml` files. 

Please. PLEASE. Do not start building jobs until you have `.yml` files configured for your team's AWS environment.

## Badges

Also if you want to brag about how well your Github Actions workflows passed, check this out.

| Environment | Branch | Badge |
| :--- | :---: | ---: |
| Production | `master` | ![Production Deployment](https://github.com/bancodebogota/bbog-dig-dt-angular-template-web-ui/workflows/Production%20Deployment/badge.svg?branch=master) |
| Stage | `stage` | ![Stage Deployment](https://github.com/bancodebogota/bbog-dig-dt-angular-template-web-ui/workflows/Stage%20Deployment/badge.svg?branch=stage) |
| QA | `qa` | ![QA Deployment](https://github.com/bancodebogota/bbog-dig-dt-angular-template-web-ui/workflows/QA%20Deployment/badge.svg?branch=qa) |

## Help

If by any chance you're having problems preparing your develpment environment or you think this introduction needs something else or you just wanna chat, go talk to him ->[👨🏻‍💻](https://github.com/aacos13)
