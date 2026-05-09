*** Settings ***
Library    SeleniumLibrary

*** Variables ***
${URL}        file:///C:/Users/Lenovo/food-delivery-frontend/pages/vendor.html
${BROWSER}    chrome

*** Test Cases ***

Open Vendor Page Successfully
    [Documentation]    Page loads correctly

    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window

    Page Should Contain    Sakura Zen Garden
    Page Should Contain Element    css=.navbar
    Page Should Contain Element    id=searchInput
    Page Should Contain Element    id=cartBtn
    Page Should Contain Element    id=dishesGrid

    Close Browser


Check Navbar Elements
    [Documentation]    Navbar should contain logo, search, explore, orders, cart

    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window

    Page Should Contain Element    css=.nav-logo
    Page Should Contain Element    id=searchInput
    Page Should Contain    EXPLORE
    Page Should Contain    ORDERS
    Page Should Contain Element    id=cartBtn
    Page Should Contain Element    id=cartCount
    Page Should Contain Element    id=cartTotal

    Close Browser


Check Hero Section
    [Documentation]    Hero section should display restaurant info

    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window

    Page Should Contain    Sakura Zen Garden
    Page Should Contain    4.8
    Page Should Contain    30-45 min delivery
    Page Should Contain    Authentic Japanese Cuisine

    Close Browser


Check Categories Bar
    [Documentation]    Categories should exist

    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window

    Page Should Contain    Popular
    Page Should Contain    Sushi Rolls
    Page Should Contain    Ramen & Noodles
    Page Should Contain    Appetizers
    Page Should Contain    Desserts
    Page Should Contain    Drinks

    Close Browser


Check Filter Panel Exists
    [Documentation]    Filter panel should exist and be hidden or toggleable

    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window

    Page Should Contain Element    id=filterPanel
    Page Should Contain Element    id=filterBtn
    Page Should Contain Element    id=priceRange
    Page Should Contain Element    id=applyFilter

    Close Browser


Check Dishes Grid
    [Documentation]    Dishes grid should be present

    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window

    Page Should Contain Element    id=dishesGrid

    Close Browser


Check Cart Sidebar Elements
    [Documentation]    Cart sidebar should exist

    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window

    Page Should Contain Element    id=cartSidebar
    Page Should Contain Element    id=cartItems
    Page Should Contain Element    id=cartOverlay
    Page Should Contain Element    id=cartCount
    Page Should Contain Element    id=subtotal
    Page Should Contain Element    id=grandTotal

    Close Browser


Check Empty Cart State
    [Documentation]    Cart empty message should appear initially

    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window

    Page Should Contain    Your cart is empty

    Close Browser


Check Search Input Exists
    [Documentation]    Search input should exist and be usable

    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window

    Element Should Be Visible    id=searchInput

    Close Browser


Check Toast Exists
    [Documentation]    Toast notification should exist

    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window

    Page Should Contain Element    id=toast
    Page Should Contain Element    id=toastMsg

    Close Browser