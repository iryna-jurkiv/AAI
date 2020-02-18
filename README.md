# Team AAI: User Access System
​
This is our final engineering project at Makers Academy. It is a web application that allows new staff to be signed up to allow middle managers, HR, IT services and others to have a single place to setup new starters.

It uses the following tech stack:
- [Express](https://expressjs.com/) web framework for Node.js.
- [Nodemon](https://nodemon.io/) to reload the server automatically.
- [EJS](https://ejs.co/) to render view templates.
- [ESLint](https://eslint.org) for linting.
- [Jest](https://jestjs.io/) for testing.
- [Cypress](https://www.cypress.io/) for end-to-end testing.
- [Postgres](https://www.postgresql.org/) for database system.
​
## Card wall
​
https://github.com/iryna-jurkiv/AAI/projects/1

## Team Charter

### Team Objectives

- Get a good understanding of how to create a Node JS Web Application including having a good level of understanding of all of the tech stack we are using
- To learn how to implement new features that we haven't previously worked on
- To consolidate and implement our learning over the past 10 weeks

### Personal Objectives & Learning Plan

Aaron D:
- To create an RBAC system
- To understand Postgres table joins and relationships

Aaron R:
- To be more comfortable writing JavaScript from scratch using Node JS
- To fully understand every line of code in our web application

Iryna:
- to set up a web app with Node JS from scratch and learn how it is different from other frameworks like React or Angular
- to gain proficiency in using JavaScript for both front-end and back-end
- to learn more about CSS frameworks like Bootstrap

### Ways of Working

- We will work in 2 day Sprints and at the end of each sprint we will show each other what we have worked on (knwoledge sharing)
- Stand up every day at 10 a.m. including Emotional Intelligence check in & feedback
- Retro every day at 4:30 p.m. time including knowledge sharing & feedback
- If stuck for more than 2 hours, then we will ask technical coach for help
- We will celebrate by going for coffee/food
- We will merge as soon as any new feature is implemented
- We will comment out our code so others can understand it
- We will require 1 review for each merge
- We will operate an open & learning culture within our team where anyone can ask questions/speak openly
- How we will manage front end and back end - Once we have finished our MVP
- We will do a combination of working on our own & pairing (as a group of 3)
- We will create the final presentation as we go (next week predominantly)

## Project Schedule

- Monday, 17th February - Learning about Node JS & how to set up a web app with Node JS
- Tuesday, 18th February - Finish setting up web app & Sign up and Sign in (Sprint start)
- Wednesday, 19th February- Log out & Profile (MVP due) (Sprint finish)
- Thursday, 20th February -  TBC
- Friday, 21st February- TBC
- Monday, 24th February- TBC
- Tuesday, 25th February - TBC
- Wednesday, 26th February - TBC
- Thursday, 27th February- TBC
- Friday, 28th February - Presentations


## MVP for Wednesday 19th February

- Allow a user to be added to the database (signup)
- Allow a user to login
- Allow a user to logout
- Allow a logged in user to see their current profile details
​
## List of features & User Stories Prioritised

- Allow a user to be added to the database and assign access levels
- Allow a user to login
- Allow a user to logout
- Allow a logged in user to see their current profile details
- Allow a middle manager to
- Allow a middle manager with access level >= Manager to sign up a user (Include HR)
- Allow a middle manager to request a new systems user account(s) for the user
- Allow a middle manager to request IT equipment for the user
- Auto generate emails
- Send email requests to relevant departments (IT, Procurement, HR etc.)
- Send email to users when items have been completed
    * User account for initial access can be provided to manager as user may not have access initially
- More to be added
- Rather then hard code HTML options, like departmental email address, managers, etc this could be accessed by DB
    * would allow for changes to be made to the DB list rather then recoding the website for expandability
- Allow super users to add above details via a service management portal on the site
- Limit email addresses at the domain level, ie, gov.uk, kpmg.com, vodafone.com etc....
    * This would prevent accidentally sending out confidential emails to 3rd parties my mistake
- More to be added

## Database View


## Quickstart
​
### Start
​
1. Start the server
    ```
    npm start
    ```
1. Browse to [http://localhost:3000](http://localhost:3000)
​
### Test
​
* Run all tests
    ```
    npm test
    ```
* Run a check
    ```bash
    npm run lint              # linter only
    npm run test:unit         # unit tests only
    npm run test:integration  # integration tests only
    ```
​
#### Start test server
​
The server must be running locally with test configuration for the
integration tests to pass.
```
npm run start:test
```
