* Settings *
Library    SeleniumLibrary

Suite Setup    Open Browser To Register Page
Suite Teardown    Close Browser

* Variables *
${URL}    file:///C:/Users/Lenovo/food-delivery-frontend/pages/user-register.html
${BROWSER}    chrome

* Test Cases *

Open Register Page Successfully
    Wait Until Page Contains Element    id:registerForm    10s

    ${title}=    Get Title
    Should Not Be Empty    ${title}

Valid Signup Data
    Reload Page

    Input Text    id:firstName    Omar
    Input Text    id:lastName    Hisham
    Input Text    id:email    omar@gmail.com
    Input Text    id:phone    01066027761

    Input Password    id:password    omar2005
    Input Password    id:confirmPassword    omar2005

    Click Button    id:continueBtn
    Sleep    2s

    Element Text Should Be    id:firstNameError    ${EMPTY}
    Element Text Should Be    id:lastNameError     ${EMPTY}
    Element Text Should Be    id:emailError        ${EMPTY}
    Element Text Should Be    id:phoneError        ${EMPTY}
    Element Text Should Be    id:passwordError     ${EMPTY}
    Element Text Should Be    id:confirmPasswordError    ${EMPTY}

Empty Submission Shows Errors
    Reload Page

    Click Button    id:continueBtn
    Sleep    1s

    Element Should Contain    id:firstNameError    First name is required
    Element Should Contain    id:lastNameError     Last name is required
    Element Should Contain    id:emailError        Please enter your email address
    Element Should Contain    id:phoneError        Please enter your phone number
    Element Should Contain    id:passwordError     Please enter your password
    Element Should Contain    id:confirmPasswordError    confirm your password

Unmatched Passwords Show Error
    Reload Page

    Input Text    id:firstName    Omar
    Input Text    id:lastName    Hisham
    Input Text    id:email    omar@gmail.com
    Input Text    id:phone    01066027761

    Input Password    id:password    omar2005
    Input Password    id:confirmPassword    wrongpass

    Click Button    id:continueBtn
    Sleep    1s

    Element Should Contain
    ...    id:confirmPasswordError
    ...    password doesn't match

Phone Number Less Than 11 Digits
    Reload Page

    Input Text    id:firstName    Omar
    Input Text    id:lastName    Hisham
    Input Text    id:email    omar@gmail.com
    Input Text    id:phone    01066

    Input Password    id:password    omar2005
    Input Password    id:confirmPassword    omar2005

    Click Button    id:continueBtn
    Sleep    1s

    Element Should Contain
    ...    id:phoneError
    ...    Please enter a valid phone number

Phone Number More Than 11 Digits
    Reload Page

    Input Text    id:firstName    Omar
    Input Text    id:lastName    Hisham
    Input Text    id:email    omar@gmail.com
    Input Text    id:phone    01066027761123

    Input Password    id:password    omar2005
    Input Password    id:confirmPassword    omar2005

    Click Button    id:continueBtn
    Sleep    1s

    Element Should Contain
    ...    id:phoneError
    ...    Please enter a valid phone number

Password Eye Toggle Works
    Reload Page

    Input Password    id:password    omar2005
    Input Password    id:confirmPassword    omar2005

    Click Element    id:eyeToggle

    ${type1}=    Get Element Attribute    id:password    type
    Should Be Equal    ${type1}    text

    Click Element    id:eyeToggle

    ${type2}=    Get Element Attribute    id:password    type
    Should Be Equal    ${type2}    password

    Click Element    id:confirmEyeToggle

    ${type3}=    Get Element Attribute    id:confirmPassword    type
    Should Be Equal    ${type3}    text

    Click Element    id:confirmEyeToggle

    ${type4}=    Get Element Attribute    id:confirmPassword    type
    Should Be Equal    ${type4}    password

* Keywords *

Open Browser To Register Page
    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window
    Set Selenium Implicit Wait    5s