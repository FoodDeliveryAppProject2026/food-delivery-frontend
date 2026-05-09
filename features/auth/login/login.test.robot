*** Settings ***
Library    SeleniumLibrary

*** Variables ***
${URL}        file:///D:/ProjectFood/food-delivery-frontend/login.html
${BROWSER}    chrome

*** Test Cases ***

# ------------------ Positive Tests ------------------

Login With Valid Credentials
    [Documentation]    user enters valid credentials
    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window
    Wait Until Element Is Visible    id=email    5s
    Input Text    id=email      testuser@example.com
    Input Text    id=password   123456
    Wait Until Element Is Visible    id=continueBtn    5s
    Click Button   id=continueBtn
    # successful login if no error messages are displayed
    Wait Until Element Does Not Contain    id=emailError    Please enter    5s
    Wait Until Element Does Not Contain    id=emailError    valid email    5s
    Wait Until Element Does Not Contain    id=passwordError    Please enter    5s
    Wait Until Element Does Not Contain    id=passwordError    at least 6 characters    5s
    Close Browser

Login With Another Valid User
    [Documentation]    Login with another valid user
    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window    
    Wait Until Element Is Visible    id=email    5s
    Input Text    id=email      user2@example.com
    Input Text    id=password   password2   
    Wait Until Element Is Visible    id=continueBtn    5s
    Click Button   id=continueBtn
    Wait Until Element Does Not Contain    id=emailError    Please enter    5s
    Wait Until Element Does Not Contain    id=emailError    valid email    5s
    Wait Until Element Does Not Contain    id=passwordError    Please enter    5s
    Wait Until Element Does Not Contain    id=passwordError    at least 6 characters    5s
    Close Browser

# ------------------ Negative Tests ------------------

Login With Invalid Email
    [Documentation]    Entering invalid email
    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window
    Wait Until Element Is Visible    id=email    5s
    Input Text    id=email     invalidEmail
    Input Text    id=password   123456
    Wait Until Element Is Visible    id=continueBtn    5s
    Click Button   id=continueBtn
    Wait Until Page Contains    Please enter a valid email address    5s
    Close Browser

Login With Wrong Password
    [Documentation]    Entering wrong password
    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window
    Wait Until Element Is Visible    id=email    5s
    Input Text    id=email      testuser@example.com
    Input Text    id=password   wrongpass
    Wait Until Element Is Visible    id=continueBtn    5s
    Click Button   id=continueBtn
    Wait Until Page Contains    Password must be at least 6 characters    5s
    Close Browser

Login With Empty Password
    [Documentation]    Empty password
    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window
    Wait Until Element Is Visible    id=email    5s
    Input Text    id=email      testuser@example.com
    Clear Element Text    id=password
    Wait Until Element Is Visible    id=continueBtn    5s
    Click Button   id=continueBtn
    Wait Until Page Contains    Please enter your password    5s
    Close Browser

Login With Empty Fields
    [Documentation]    All fields are empty
    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window
    Clear Element Text    id=email
    Clear Element Text    id=password
    Wait Until Element Is Visible    id=continueBtn    5s
    Click Button   id=continueBtn
    Wait Until Page Contains    Please enter your email address.    5s
    Wait Until Page Contains    Please enter your password    5s
    Close Browser

# ------------------ Validation / UI Tests ------------------

Login With Short Email
    [Documentation]    check email length
    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window
    Wait Until Element Is Visible    id=email    5s
    Input Text    id=email      a@b
    Input Text    id=password   123456
    Wait Until Element Is Visible    id=continueBtn    5s
    Click Button   id=continueBtn
    Wait Until Page Contains    Please enter a valid email address.    5s
    Close Browser

Login With Special Characters In Password
    [Documentation]    Entering unauthorized characters in password
    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window
    Wait Until Element Is Visible    id=email    5s
    Input Text    id=email      testuser@example.com
    Input Text    id=password   !@#$%^
    Wait Until Element Is Visible    id=continueBtn    5s
    Click Button   id=continueBtn
    Wait Until Page Contains    Password must be at least 6 characters    5s
    Close Browser

Check Forgot Password Link
    [Documentation]   check forgot password link
    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window
    Wait Until Element Is Visible    css=.forgot-link    5s
    Click Link    css=.forgot-link
    Wait Until Page Contains    Reset Password    5s
    Close Browser

Check Login Button Enabled
    [Documentation]    login check button is enabled
    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window
    Wait Until Element Is Visible    id=continueBtn    5s
    Element Should Be Enabled    id=continueBtn
    Close Browser