*** Settings ***
Library    SeleniumLibrary

*** Variables ***
${URL}        file:///C:/Users/Lenovo/food-delivery-frontend/features/dashboard/dashboard.html
${BROWSER}    chrome


*** Test Cases ***

Open Dashboard Page Successfully
    [Documentation]    Dashboard page loads correctly

    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window

    Page Should Contain    Today's Summary
    Page Should Contain    Good Morning, Chris
    Page Should Contain Element    css=.main-content

    Close Browser


Check Topbar Elements
    [Documentation]    Topbar should contain logo and action buttons

    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window

    Page Should Contain Element    css=.topbar
    Page Should Contain Element    css=.logo-img
    Page Should Contain    Get Help

    Close Browser


Check Sidebar Navigation
    [Documentation]    Sidebar navigation links should exist

    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window

    Page Should Contain    Dashboard
    Page Should Contain    Orders
    Page Should Contain    Stores
    Page Should Contain    Analytics
    Page Should Contain    Customers
    Page Should Contain    Marketing
    Page Should Contain    Menu
    Page Should Contain    Settings

    Close Browser


Check Restaurant Card
    [Documentation]    Restaurant information card should appear

    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window

    Page Should Contain    Burger House
    Page Should Contain    Food Delivery Business

    Close Browser


Check Hero Section
    [Documentation]    Hero section should contain summary content

    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window

    Page Should Contain    Today's Summary
    Page Should Contain    View Reports
    Page Should Contain Element    css=.primary-btn

    Close Browser


Check Statistics Cards
    [Documentation]    Statistics cards should appear

    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window

    Page Should Contain    Total Sales
    Page Should Contain    Total Orders
    Page Should Contain    Average Ticket

    Close Browser


Check Opportunities Section
    [Documentation]    Top opportunities section should exist

    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window

    Page Should Contain    Top Opportunities
    Page Should Contain    Boost your store visibility with promotions

    Close Browser


Check Sales Overview Section
    [Documentation]    Sales overview section should appear

    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window

    Page Should Contain    Sales Overview
    Page Should Contain    Last 30 Days
    Page Should Contain    Sales
    Page Should Contain    Orders

    Close Browser


Check Quick Actions Section
    [Documentation]    Quick actions items should exist

    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window

    Page Should Contain    Quick Actions
    Page Should Contain    Boost Store
    Page Should Contain    Run Promotion
    Page Should Contain    Edit Menu
    Page Should Contain    Store Hours

    Close Browser


Check Mobile Menu Button
    [Documentation]    Mobile menu button should exist

    Open Browser    ${URL}    ${BROWSER}

    Set Window Size    500    800

    Page Should Contain Element    id=menuBtn
    Page Should Contain Element    id=sidebar
    Page Should Contain Element    id=sidebarOverlay

    Close Browser


Check Sidebar Toggle Functionality
    [Documentation]    Sidebar should toggle on menu button click

    Open Browser    ${URL}    ${BROWSER}

    Set Window Size    500    800

    Wait Until Element Is Visible    id=menuBtn    10s

    Click Element    id=menuBtn

    Sleep    1s

    Element Attribute Value Should Be
    ...    id=sidebar
    ...    class
    ...    sidebar show

    Click Element    id=sidebarOverlay

    Sleep    1s

    Element Attribute Value Should Be
    ...    id=sidebar
    ...    class
    ...    sidebar

    Close Browser


Check Icons Exist
    [Documentation]    Important dashboard icons should exist

    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window

    Page Should Contain Element    css=.fa-headset
    Page Should Contain Element    css=.fa-bell
    Page Should Contain Element    css=.fa-house
    Page Should Contain Element    css=.fa-chart-line

    Close Browser