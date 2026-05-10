* Settings *
Library    SeleniumLibrary

Suite Setup    Open Orders Page
Suite Teardown    Close Browser


* Variables *
${URL}        file:///C:/Users/Lenovo/food-delivery-frontend/features/orders/orders.html
${BROWSER}    chrome


* Test Cases *

Verify Page Loaded
    Title Should Be    Food Delivery Orders
    Sleep    3s

Verify Menu Button Exists
    Wait Until Page Contains Element    id=menuBtn    20s

Verify Sidebar Open
    Click Element    id=menuBtn
    Sleep    2s
    Wait Until Page Contains Element    id=sidebar    10s

Verify Sidebar Close
    Click Element    id=overlay
    Sleep    2s
    Wait Until Page Does Not Contain Element    id=sidebar    10s

Verify Orders Table
    Wait Until Page Contains Element    class=orders-table    10s

Verify Order Cards Count
    ${count}=    Get Element Count    class=order-card
    Should Be Equal As Integers    ${count}    4

Verify Order Data
    Wait Until Page Contains    FD-1201
    Wait Until Page Contains    Ahmed Ali
    Wait Until Page Contains    Sara Mohamed
    Wait Until Page Contains    Delivered
    Wait Until Page Contains    Cancelled


* Keywords *

Open Orders Page
    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window
    Set Selenium Timeout    10s
    Sleep    4s