Feature: test drive selenium webdriver on naver

  Scenario: Finding some otaku content
    Given I am on the Naver search page
    When I search for "코노스바" on naver
    Then the first website link should go to namu wiki
