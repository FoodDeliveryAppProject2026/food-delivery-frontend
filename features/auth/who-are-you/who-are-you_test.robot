* Settings *
Library    SeleniumLibrary

Suite Setup    Open Browser To Who Page
Suite Teardown    Close Browser


* Variables *
${URL}        file:///C:/Users/Lenovo/food-delivery-frontend/features/auth/who-are-you/who.html
${BROWSER}    chrome


* Test Cases *

Verify Page Title
    Title Should Be    Hot Meal

Verify Navbar Logo
    Element Should Be Visible    class=logo-img

Verify Hero Heading
    Element Should Be Visible    xpath=//h1[contains(text(),'Who are you ?')]

Verify Hero Description
    Page Should Contain    Choose your role to get started with your Hot Meal journey.

Verify Customer Card Visibility
    Element Should Be Visible    xpath=//h2[contains(text(),'CUSTOMER')]

Verify Customer Description
    Page Should Contain    Order delicious meals

Verify Customer Select Button
    Element Should Be Visible    xpath=(//button[contains(text(),'SELECT')])[1]

Verify Vendor Card Visibility
    Element Should Be Visible    xpath=//h2[contains(text(),'VENDOR')]

Verify Vendor Description
    Page Should Contain    Manage your diner

Verify Vendor Select Button
    Element Should Be Visible    xpath=(//button[contains(text(),'SELECT')])[2]

Verify Driver Card Visibility
    Element Should Be Visible    xpath=//h2[contains(text(),'DRIVER')]

Verify Driver Description
    Page Should Contain    deliver hot comfort food

Verify Driver Select Button
    Element Should Be Visible    xpath=(//button[contains(text(),'SELECT')])[3]

Verify Customer Button Navigation
    Click Element    xpath=(//button[contains(text(),'SELECT')])[1]
    Sleep    1s

Verify Vendor Button Navigation
    Go To    ${URL}
    Click Element    xpath=(//button[contains(text(),'SELECT')])[2]
    Sleep    1s

Verify Driver Button Navigation
    Go To    ${URL}
    Click Element    xpath=(//button[contains(text(),'SELECT')])[3]
    Sleep    1s

Verify Total Number Of Cards
    ${count}=    Get Element Count    xpath=//div[contains(@class,'role-card')]
    Should Be Equal As Integers    ${count}    3

Verify Total Number Of Buttons
    ${btn_count}=    Get Element Count    xpath=//button[contains(@class,'select-btn')]
    Should Be Equal As Integers    ${btn_count}    3

Verify Icons Visibility
    Element Should Be Visible    xpath=(//div[contains(@class,'icon-box')])[1]
    Element Should Be Visible    xpath=(//div[contains(@class,'icon-box')])[2]
    Element Should Be Visible    xpath=(//div[contains(@class,'icon-box')])[3]


* Keywords *

Open Browser To Who Page
    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window
    Sleep    2s