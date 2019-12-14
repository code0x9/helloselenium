Feature: test drive selenium webdriver on google

  Scenario: Finding some cheese
    Given I am on the Google search page
    When I search for "Cheese!"
    Then the page title should start with "cheese"

  Scenario: Finding some hoon
    Given I am on the Google search page
    When I search for "hoon"
    Then the page title should start with "hoon"
