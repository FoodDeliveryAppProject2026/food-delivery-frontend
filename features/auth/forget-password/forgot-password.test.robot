*** Settings ***
Library    SeleniumLibrary

*** Variables ***
${URL}        file:///C:/Users/Lenovo/food-delivery-frontend/pages/forgot-password.html
${BROWSER}    chrome


*** Test Cases ***

Open Forgot Password Page Successfully
    [Documentation]    Forgot password page loads correctly

    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window

    Page Should Contain    Reset Password
    Page Should Contain Element    id=email
    Page Should Contain Element    id=continueBtn
    Page Should Contain Element    id=forgotPasswordForm

    Close Browser


Check Navbar Logo
    [Documentation]    Navbar logo should be visible

    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window

    Page Should Contain Element    css=.navbar-logo
    Page Should Contain Element    css=.logo-img

    Close Browser


Check Email Input Field
    [Documentation]    Email input should exist and be visible

    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window

    Element Should Be Visible    id=email
    Page Should Contain Element    id=emailError

    Close Browser


Check Reset Button
    [Documentation]    Reset password button should exist

    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window

    Page Should Contain Element    id=continueBtn
    Page Should Contain    Reset my Password

    Close Browser


Check Empty Submission Error
    [Documentation]    Error should appear when submitting empty form

    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window

    Click Button    id=continueBtn

    Page Should Contain    Please enter your email address

    Close Browser


Check Invalid Email Format Error
    [Documentation]    Invalid email should show error

    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window

    Input Text    id=email    omar@gmail
    Click Button    id=continueBtn

    Page Should Contain    Please enter a valid email address

    Close Browser


Check Valid Email Submission
    [Documentation]    Valid email should not show error

    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window

    Input Text    id=email    omar@gmail.com
    Click Button    id=continueBtn

    Element Text Should Be    id=emailError    ${EMPTY}

    Close Browser


Check Footer / Layout Elements
    [Documentation]    Basic layout elements exist

    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window

    Page Should Contain    Reset Password

    Close Browser