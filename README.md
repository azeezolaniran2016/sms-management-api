# sms-management-api
[![Build Status](https://travis-ci.org/azeezolaniran2016/sms-management-api.svg?branch=master)](https://travis-ci.org/azeezolaniran2016/sms-management-api) [![Coverage Status](https://coveralls.io/repos/github/azeezolaniran2016/sms-management-api/badge.svg?branch=master)](https://coveralls.io/github/azeezolaniran2016/sms-management-api?branch=master)

### Introduction
SMS Management API is an api for managing Contacts and Messages. It allows the following operations:
- Creation of Contacts (with unique mobile numbers)
- Creation of Messages which are linked to two Contacts: Sender and Receiver of the message
- Deletion of Contacts - This deletes all messages sent by or received by the contact.
- Updating Contact and Messages details.
- And much more, if not already implemented, surely are in the works

### Requirements
To be able to run this application locally, the following are required:
- [Node.JS]
- [Node Package Manager (npm)]

### How To Use
This can be easily installed locally through these steps:
- Clone the repository locally
- Run `npm install` to install dependent Node packages
- Run `npm start` to start the server

### API Documentation
To interact with this service, you should use the API documentation available at [Swagger Hub](https://app.swaggerhub.com/apis/azeez-olaniran/rest-api_for_the_sms_management_application/v1)

### How To Test
This application can be tested locally by running `npm test`


### Roadmap
[Project Roadmap](https://trello.com/b/pG2L1GNa/sms-management-api)

### Contributors
- [Azeez Olaniran](https://github.com/azeezolaniran2016)

## How to Contribute
1. Fork this repository to your GitHub account
2. Clone the forked repository
3. Create your feature branch
4. Commit your changes
5. Push to the remote branch
6. Open a Pull Request

## Task List
- [x] Setup Version Control System
- [x] Setup CI/CD using Travis for builds and Coveralls for coverage reporting
- [x] Add Integration tests
- [x] Implement Data Layer - Models, Migrations..
- [x] Implement Routes, Controllers, and API server
- [ ] Implement Pagination through endpoints
- [ ] Implement Searching through endpoints
- [ ] Setup code style linting checks
- [ ] Add UI

## Technologies
sms-management-api is implemented using a number of technologies, these include:
* [node.js] - evented I/O for the backend
* [chai] - Assertion library for use with Mocha
* [express] - Serves development and production builds]
* [mocha] - JavaScript testing library
* [supertest] - HTTP assertions made easy via superagent
* [faker] - Generate massive amounts of fake data in the browser and node.js


   [mocha]: <https://mochajs.org>
   [node.js]: <http://nodejs.org>
   [chai]: <http://chaijs.com/api/bdd/>
   [express]: <http://expressjs.com/>
   [mocha]: <https://mochajs.org/>
   [supertest]: <https://github.com/visionmedia/supertest>
   [faker]: <https://github.com/marak/Faker.js/>
   [Node Package Manager (npm)]: <https://www.npmjs.com>
