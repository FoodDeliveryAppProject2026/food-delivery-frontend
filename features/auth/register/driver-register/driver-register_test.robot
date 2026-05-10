*** Settings ***
Library    SeleniumLibrary

*** Variables ***
${URL}        file:///C:/Users/Lenovo/food-delivery-frontend/features/auth/register/driver-register/driver-register.html
${BROWSER}    chrome


*** Test Cases ***

Open Driver Register Page Successfully
    [Documentation]    Driver register page loads correctly

    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window

    Page Should Contain    Sign Up
    Page Should Contain Element    id=registerForm
    Page Should Contain Element    id=firstName
    Page Should Contain Element    id=lastName
    Page Should Contain Element    id=email
    Page Should Contain Element    id=phone
    Page Should Contain Element    id=password
    Page Should Contain Element    id=confirmPassword

    Close Browser


Check Navbar Logo
    [Documentation]    Navbar logo should be visible

    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window

    Page Should Contain Element    css=.navbar-logo
    Page Should Contain Element    css=.logo-img

    Close Browser


Check Form Fields Visibility
    [Documentation]    All register fields should be visible

    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window

    Element Should Be Visible    id=firstName
    Element Should Be Visible    id=lastName
    Element Should Be Visible    id=email
    Element Should Be Visible    id=phone
    Element Should Be Visible    id=password
    Element Should Be Visible    id=confirmPassword

    Close Browser


Check Continue Button
    [Documentation]    Continue button should exist

    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window

    Page Should Contain Element    id=continueBtn
    Page Should Contain    Continue

    Close Browser


Check Google Button Exists
    [Documentation]    Google signup button should exist

    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window

    Page Should Contain Element    id=googleBtn
    Page Should Contain    Continue With Google

    Close Browser


Check Password Toggle Buttons
    [Documentation]    Password eye toggle buttons should exist

    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window

    Page Should Contain Element    id=eyeToggle
    Page Should Contain Element    id=confirmEyeToggle

    Close Browser


Check Empty Submission Errors
    [Documentation]    Empty form submission should show validation errors

    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window

    Click Button    id=continueBtn

    Page Should Contain    First name is required.
    Page Should Contain    Last name is required.
    Page Should Contain    Please enter your email address.
    Page Should Contain    Please enter your phone number.
    Page Should Contain    Please enter your password.
    Page Should Contain    You need to confirm your password.

    Close Browser


Check Invalid Email Format
    [Documentation]    Invalid email should show error

    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window

    Input Text    id=email    omar@gmail
    Click Button    id=continueBtn

    Page Should Contain    Please enter a valid email address.

    Close Browser


Check Invalid Phone Number
    [Documentation]    Invalid phone number should show error

    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window

    Input Text    id=phone    01023
    Click Button    id=continueBtn

    Page Should Contain    Please enter a valid phone number.

    Close Browser


Check Short Password Error
    [Documentation]    Password less than 6 chars should show error

    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window

    Input Text    id=password    123
    Click Button    id=continueBtn

    Page Should Contain    Password must be at least 6 characters.

    Close Browser


Check Password Mismatch Error
    [Documentation]    Different passwords should show mismatch error

    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window

    Input Text    id=password    omar123
    Input Text    id=confirmPassword    omar456

    Click Button    id=continueBtn

    Page Should Contain    password doesn't match.

    Close Browser


Check Valid Form Submission
    [Documentation]    Valid form data should not show errors

    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window

    Input Text    id=firstName    Omar
    Input Text    id=lastName    Hisham
    Input Text    id=email    omar@gmail.com
    Input Text    id=phone    01012345678
    Input Text    id=password    omar123
    Input Text    id=confirmPassword    omar123

    Click Button    id=continueBtn

    Element Text Should Be    id=firstNameError    ${EMPTY}
    Element Text Should Be    id=lastNameError    ${EMPTY}
    Element Text Should Be    id=emailError    ${EMPTY}
    Element Text Should Be    id=phoneError    ${EMPTY}
    Element Text Should Be    id=passwordError    ${EMPTY}
    Element Text Should Be    id=confirmPasswordError    ${EMPTY}

    Close Browser


Check Login Link Exists
    [Documentation]    Sign in link should exist

    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window

    Page Should Contain    Already have an account? Sign in
    Page Should Contain Element    css=.signup-link

    Close Browser