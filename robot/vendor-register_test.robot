*** Settings ***
Library    SeleniumLibrary

*** Variables ***
${URL}        file:///C:/Users/Lenovo/food-delivery-frontend/pages/vendor-register.html
${BROWSER}    chrome

*** Test Cases ***

Open Vendor Register Page Successfully
    [Documentation]    Vendor register page loads correctly

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
    Page Should Contain Element    id=address
    Page Should Contain Element    id=storeName
    Page Should Contain Element    id=businessType
    Page Should Contain Element    id=cuisineType

    Close Browser


Check Navbar Logo
    [Documentation]    Navbar logo should exist

    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window

    Page Should Contain Element    css=.navbar-logo
    Page Should Contain Element    css=.logo-img

    Close Browser


Check Google Button Exists
    [Documentation]    Google sign up button exists

    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window

    Page Should Contain    Continue With Google
    Page Should Contain Element    id=googleBtn

    Close Browser


Check Form Fields Visibility
    [Documentation]    All input fields should be visible

    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window

    Element Should Be Visible    id=firstName
    Element Should Be Visible    id=lastName
    Element Should Be Visible    id=email
    Element Should Be Visible    id=phone
    Element Should Be Visible    id=password
    Element Should Be Visible    id=confirmPassword
    Element Should Be Visible    id=address
    Element Should Be Visible    id=storeName
    Element Should Be Visible    id=businessType
    Element Should Be Visible    id=cuisineType

    Close Browser


Check Continue Button Exists
    [Documentation]    Continue button should exist

    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window

    Page Should Contain Element    id=continueBtn
    Page Should Contain    Continue

    Close Browser


Check Password Toggle Buttons
    [Documentation]    Eye toggle buttons exist

    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window

    Page Should Contain Element    id=eyeToggle
    Page Should Contain Element    id=confirmEyeToggle

    Close Browser


Check Login Link Exists
    [Documentation]    Already have account link exists

    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window

    Page Should Contain    Already have an account?
    Page Should Contain Element    css=.signup-link

    Close Browser