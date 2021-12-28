Feature: rest api

  Scenario Outline: create a user
    Given A user <request>
    When I send POST request to /api/users/create
    Then I get response POST request code 201

    Examples:
      | request                                                                                                  |
      | {"username":"username01","password": "pass12345" ,"email":"email01@gmail.com","status": 1,"roles_id": 1} |
      | {"username":"username02","password": "pass12345" ,"email":"email02@gmail.com","status": 10,"roles_id": 4}|

  Scenario Outline: get all user
    When I send GET request to /api/users
    Then I get response GET all user request code 200 

  Scenario Outline: get one user (check status)
    Given The user with <id> exist
    When I send GET one user request to /api/users
    Then I get response GET one user request code 200

    Examples:
      | id |
      | 1  |
      | 2  |
  
#  Scenario Outline: get one other user (check response)
#    Given The other user with <id> exist
#    When I send GET request one other user to /api/users
#    Then I get receive <response>

#    Examples:
#      | id | response |
#      | 1  | {"username":"username01","password": "pass12345" ,"email":"email01@gmail.com","status": 1,"roles_id": 1} |
#      | 2  | {"username":"username02","password": "pass12345" ,"email":"email02@gmail.com","status": 10,"roles_id": 4}|

  Scenario Outline: update one user
    Given The user update with <id> exist
    When I send PUT request update one user with a <request> to /api/users
    Then I get response PUT request code 201

    Examples:
      | id | request |
      | 1  | {"username":"username03","password": "pass12345" ,"email":"email01@gmail.com","status": 1,"roles_id": 1} |
      | 2  | {"username":"username04","password": "pass12345" ,"email":"email02@gmail.com","status": 10,"roles_id": 4}|
  
  Scenario Outline: delete one user
    Given The user delete with <id> exist
    When I send DELETE request to /api/users
    Then I get response DELETE request code 200

    Examples:
      | id |
      | 1  |

  Scenario Outline: delete all user
    When I send DELETE all request to /api/users/delete-all
    Then I get response DELETE all request code 200