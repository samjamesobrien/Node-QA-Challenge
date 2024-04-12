Feature: Assessment App

  Scenario: Storing data
    Given I have launched the assessment application
    When I enter "End-to-end test data" into the input field
    And I click the "Store Data" button to store data
    Then I should see a success message indicating data is saved
    And the stored data should be retrievable
