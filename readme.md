# Assessment Application

The Assessment Application is a simple web application with a frontend and backend. The frontend provides a user interface to interact with the backend APIs. The backend exposes two APIs - one for storing data into a local file and another for retrieving stored data from the file. Additionally, the backend includes an API to delete data from the file.

## Prerequisites

Before running the application or tests, ensure that you have the following prerequisites installed:

- Node.js: Version 12.x or later
- npm: Version 6.x or later

### Installation

To install the Assessment Application, follow these steps:

1. Clone the repository: `git clone git@github.com:samjamesobrien/Node-QA-Challenge.git`
2. Navigate to the project directory: `cd Node-QA-Challenge`
3. Install dependencies: `npm clean-install`

## Usage

### Running the Application

To run the Assessment Application, use the following command: `npm start`

The application will be accessible at [http://localhost:3000](http://localhost:3000).

### Running Tests

To run all tests call `npm test`

To run only unit tests, use the following command: `npm run test:unit`

To run only BDD tests (Cucumber), use the following command: `npm run test:bdd`

---

# Challenge Tasks

## Feature

As a product owner I would like to have an easy and lightweight To-Do app, where users can quickly add and remove their ongoing tasks, and remove them when complete clicking the "X".

## Tasks

1.1 Read the app documentation (this readme), and based on "Feature" section check:

- Is the story & feature well defined?
- Are BDD tests in feature file sufficient?
- How would you define your feature file?

1.2 Use the app in exploratory fashion and check:

- Does the app work as designed
- Are there any bugs?
- If so write a bug report on them

1.3 Check unit test execution and coverage

- Do you find these unit tests done right?
- Would you suggest to your team to add more, or write them in a different way? 
- What other tools or processes would you suggest?
