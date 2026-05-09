*** Settings ***
Library    SeleniumLibrary

*** Variables ***
${URL}        file:///C:/Users/Lenovo/food-delivery-frontend/pages/cart.html
${BROWSER}    chrome

*** Test Cases ***

Open Cart Page Successfully
    [Documentation]    Cart page should load correctly
    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window
    Wait Until Page Contains    Your Cart    5s
    Wait Until Page Contains    Order Summary    5s
    Close Browser


Check Cart Items Are Visible
    [Documentation]    Cart items should be displayed
    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window
    Page Should Contain    Dragon Roll
    Page Should Contain    Tonkotsu Ramen
    Close Browser


Check Quantity Buttons Exist
    [Documentation]    + and - buttons should exist
    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window
    Page Should Contain Element    css=.qty-btn
    Close Browser


Check Remove Button Exists
    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window
    Page Should Contain Element    css=.remove-btn
    Close Browser


Check Order Summary Section
    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window
    Page Should Contain    Subtotal
    Page Should Contain    Delivery Fee
    Page Should Contain    Total
    Close Browser


Check Checkout Button Exists
    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window
    Element Should Be Visible    css=.checkout-btn
    Element Should Be Enabled    css=.checkout-btn
    Close Browser


Check Upsell Items Exist
    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window
    Page Should Contain    Iced Matcha Latte
    Page Should Contain    Mochi Trio
    Close Browser


Check Add Buttons In Upsell
    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window
    Page Should Contain Element    css=.add-btn
    Close Browser


Check Navbar Exists
    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window
    Page Should Contain    HotMeal
    Page Should Contain    Explore
    Page Should Contain    Orders
    Close Browser