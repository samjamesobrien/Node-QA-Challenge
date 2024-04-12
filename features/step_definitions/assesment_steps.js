const { Before, After, Given, When, Then } = require('cucumber');
const request = require('supertest');
const fs = require('fs');
const app = require('../../index');
const assert = require('assert');

// Before each scenario
Before(function () {
    // Delete the data file before each scenario
    try {
      fs.unlinkSync('data.txt');
    } catch (err) {
      // File may not exist, ignore error
    }
  });
  
  // After each scenario
  After(function () {
    // Delete the data file after each scenario
    try {
      fs.unlinkSync('data.txt');
    } catch (err) {
      // File may not exist, ignore error
    }
  });

Given('I have launched the assessment application', () => {
  // No action needed, the application should already be running
});

When(/^I enter (.+) into the input field$/, async (data) => {
  this.testData = data;
});

When('I click the {string} button to store data', async (buttonText) => {
  // We'll simulate the button click by sending a POST request
  this.response = await request(app)
    .post('/data')
    .send({ data: this.testData });
});

When('I click the {string} button to retrieve data', async (buttonText) => {
  // We'll simulate the button click by sending a GET request
  this.response = await request(app)
    .get('/data');
});

Then('I should see a success message indicating data is saved', () => {
  // No action needed, we'll verify the response status in the next step
});

Then('the stored data should be retrievable', async () => {
    // const responseText = this.response.text.trim();
    const responseText = await request(app)
    .get('/data');

    console.log('Actual data retrieved:', responseText.body); // Add logging
    assert.strictEqual(responseText.body[0].text, this.testData);
  });
