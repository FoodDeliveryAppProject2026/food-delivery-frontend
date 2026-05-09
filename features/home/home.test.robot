*** Settings ***
Library    SeleniumLibrary

*** Variables ***
${URL}        file:///C:/Users/Lenovo/food-delivery-frontend/pages/home.html
${BROWSER}    chrome

*** Test Cases ***

Open Home Page Successfully
    [Documentation]    Home page loads correctly

    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window

    Wait Until Page Contains    Order delivery near you    10s
    Page Should Contain Element    id=addressInput
    Page Should Contain Element    id=searchBtn

    Close Browser


Check Navbar Elements
    [Documentation]    Navbar should contain logo and auth buttons

    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window

    Page Should Contain Element    id=navbar
    Page Should Contain    Sign In
    Page Should Contain    Sign Up
    Page Should Contain Element    css=.navbar-logo

    Close Browser


Check Hero Section
    [Documentation]    Hero section elements exist

    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window

    Page Should Contain    Order delivery near you
    Element Should Be Visible    id=addressInput
    Element Should Be Visible    id=searchBtn

    Close Browser


Check Join Section
    [Documentation]    Join section content should appear

    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window

    Page Should Contain    Join
    Page Should Contain    HotMeal
    Page Should Contain    Order Now
    Page Should Contain    Learn More

    Close Browser


Check Feature Cards
    [Documentation]    Feature cards should exist

    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window

    Page Should Contain Element    css=.feature-card
    Page Should Contain    Browse Food
    Page Should Contain    Grow Your Restaurant
    Page Should Contain    Deliver With US

    Close Browser


Check Restaurants Banner
    [Documentation]    Restaurants banner should appear

    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window

    Page Should Contain    Restaurants & Dining
    Page Should Contain    Find Restaurants
    Page Should Contain Element    css=.restaurants-banner

    Close Browser


Check Categories Section
    [Documentation]    Categories section should contain cafes and groceries

    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window

    Page Should Contain    Cafes & Bakeries
    Page Should Contain    Groceries & Supermarkets
    Page Should Contain    Find Cafés
    Page Should Contain    Find Groceries

    Close Browser


Check Reviews Section
    [Documentation]    Reviews section should appear

    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window

    Page Should Contain    Reviews
    Page Should Contain    Here's what people are saying
    Page Should Contain Element    id=reviewsGrid

    Close Browser


Check Footer Section
    [Documentation]    Footer should contain support links

    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window

    Page Should Contain    About Us
    Page Should Contain    Help Center
    Page Should Contain    Privacy Policy
    Page Should Contain    Terms of Use

    Close Browser


Check Quote Section
    [Documentation]    Quote section should exist

    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window

    Page Should Contain    HotMeal delivers it all

    Close Browser