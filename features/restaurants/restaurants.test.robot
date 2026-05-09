* Settings *
Library    SeleniumLibrary
Suite Setup    Open Browser To Page
Suite Teardown    Close Browser

* Variables *
${URL}        file:///C:/Users/Lenovo/food-delivery-frontend/pages/restaurants.html
${BROWSER}    chrome

* Test Cases *

Open Restaurants Page Successfully
    Page Should Be Loaded
    Title Should Not Be Empty

Search Function Works
    Input Text    id:searchInput    Burger
    Click Button    id:searchBtn
    Sleep    2s
    Page Should Contain Element    css:.list-card

Sort Dropdown Works
    Select From List By Value    id:sortSelect    rating
    Sleep    2s
    Page Should Contain Element    css:.list-card

Filter Panel Opens
    Click Button    id:filterBtn
    Wait Until Element Is Visible    id:filterPanel    5s

Show More Button Works
    ${visible}=    Run Keyword And Return Status
    ...    Element Should Be Visible    id:showMoreBtn

    Run Keyword If    ${visible}
    ...    Scroll Element Into View    id:showMoreBtn

    Run Keyword If    ${visible}
    ...    Click Element    id:showMoreBtn

    Sleep    2s

* Keywords *

Open Browser To Page
    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window
    Set Selenium Implicit Wait    5s

Page Should Be Loaded
    Wait Until Page Contains Element    css:body    10s

Title Should Not Be Empty
    ${title}=    Get Title
    Should Not Be Empty    ${title}