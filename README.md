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
- To gain proficiency in GitHub (i.e. merges, branches etc)

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
- We will all work on front-end and back-end
- We will do a combination of working on our own & pairing (as a group of 3)

## Project Schedule

- Monday, 17th February - Learning about Node JS & how to set up a web app with Node JS
- Tuesday, 18th February - Finish setting up web app & Sign up and Sign in (Sprint start)
- Wednesday, 19th February- Log out & Profile (MVP due) (Sprint finish)
- Thursday, 20th February -  Search Bar, Nav Bar & Email Requests sent to Employees to login
- Friday, 21st February- learning about JQuery & AJAX call to be able to edit information, adding start date, adding manager email for users and searching by name or employee id
- Monday, 24th February- Front-end pages & Refactoring existing code
- Tuesday, 25th February - Front-end pages & profile photos
- Wednesday, 26th February -  Emails to Facilities, Front-end pages and Tasks Left to for Staff  (Feature Freeze)
- Thursday, 27th February- Deploy to Herouku, Screen Recording and Practice Presentation
- Friday, 28th February - Final Presentation


## MVP for Wednesday 19th February

- Allow a user to be added to the database
- Allow a user to login
- Allow a user to logout
- Allow a logged in user to see their current profile details
​
## List of features Implemented

Staff:

- Sign In
- Sign Out
- Tasks Left To do
- Look at others employees' profiles
- Staff Chatbot
- Edit and Update Personal Information
- Upload Profile Photo
- See Requests Made for Them
- Role-Based Access and View

Managers:

- Sign In
- Sign Out
- See Their Team
- Edit and Update Personal Information
- Upload Profile Photo
- Edit Their Team’s Information
- Create Requests for Their Team - emails sent to IT & Facilities when requests are created
- Role-Based Access and View

HR:

- Sign In
- Sign Out
- See Employees in Their Department including their contact information
- Edit their personal information
- Upload Profile Photo
- Search for employees
- Add Employee with emails sent to employee and manager notifying to sign in
- See all employees
- Edit all employees' information including access levels
- Create Requests for all employees with emails sent to IT and Facilities


## How to run

1. Clone this repository

2. Download all dependencies
```
npm install
```
3. Create AAI database and tables (details found in Migrations --> 01_ Tables.SQL )

4. Start the server

    ```
    npm start
    ```
5. Browse to [http://localhost:3000](http://localhost:3000)
​
