/**
 * @jest-environment jsdom
 */
const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.resolve(__dirname, './vendor-register.html'), 'utf8');
describe('User Sign Up Test' , () =>{
    beforeEach(() =>{
        document.documentElement.innerHTML = html.toString();
		jest.resetModules();
		require('./vendor-register.js');
    });
  test.each([
    ['omar', 'elshafey', 'omar@gmail.com', '01066027761', 'omar2005', 'omar2005', 'NewYork', 'HeartAttack', 'Restaurant', 'American'],
    ['ahmed', 'hassan', 'ahmed@gmail.com', '01012345678', 'ahmed123', 'ahmed123', 'Cairo', 'BurgerKing', 'Restaurant', 'American']
  ])(
    'Valid Vendor Sign up test',
    (first, last, email, phone, pass, passconf, address, store, business, cuisine) => {
const firstNameInput = document.getElementById("firstName");
const lastNameInput = document.getElementById("lastName");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");
const phoneInput = document.getElementById("phone");
const addressInput = document.getElementById("address");
const storeNameInput = document.getElementById("storeName");
const businessTypeInput = document.getElementById("businessType");
const cuisineTypeInput = document.getElementById("cuisineType");

// Inputs Errors
const firstNameError = document.getElementById("firstNameError");
const lastNameError = document.getElementById("lastNameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const confirmPasswordError = document.getElementById("confirmPasswordError");
const phoneError = document.getElementById("phoneError");
const addressError = document.getElementById("addressError");
const storeNameError = document.getElementById("storeNameError");
const businessTypeError = document.getElementById("businessTypeError");
const cuisineTypeError = document.getElementById("cuisineTypeError");

// Btn
const continueBtn = document.getElementById("continueBtn");

      firstNameInput.value = first;
      lastNameInput.value = last;
      emailInput.value = email;
      phoneInput.value = phone;
      passwordInput.value = pass;
      confirmPasswordInput.value = passconf;
      addressInput.value = address;
      storeNameInput.value = store;
      businessTypeInput.value = business;
      cuisineTypeInput.value = cuisine;

      continueBtn.click();
      expect(firstNameError.textContent).toBe("");
      expect(lastNameError.textContent).toBe("");
      expect(emailError.textContent).toBe("");
      expect(phoneError.textContent).toBe("");
      expect(passwordError.textContent).toBe("");
      expect(confirmPasswordError.textContent).toBe("");
      expect(addressError.textContent).toBe("");
      expect(storeNameError.textContent).toBe("");
      expect(businessTypeError.textContent).toBe("");
      expect(cuisineTypeError.textContent).toBe("");
    });


    test("On Empty Subbmissions" , ()=>{
// Inputs Errors
const firstNameError = document.getElementById("firstNameError");
const lastNameError = document.getElementById("lastNameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const confirmPasswordError = document.getElementById("confirmPasswordError");
const phoneError = document.getElementById("phoneError");
const addressError = document.getElementById("addressError");
const storeNameError = document.getElementById("storeNameError");
const businessTypeError = document.getElementById("businessTypeError");
const cuisineTypeError = document.getElementById("cuisineTypeError");

// Btn
const continueBtn = document.getElementById("continueBtn");
continueBtn.click();
expect(firstNameError.textContent).toBe("First name is required.");
expect(lastNameError.textContent).toBe("Last name is required.");
expect(emailError.textContent).toBe("Please enter your email address.");
expect(phoneError.textContent).toBe("Please enter your phone number.");
expect(passwordError.textContent).toBe("Please enter your password.");
expect(confirmPasswordError.textContent).toBe("You need to confirm your password.");
expect(addressError.textContent).toBe("Address is required.");
expect(storeNameError.textContent).toBe("Store Name is required.");
expect(businessTypeError.textContent).toBe("Business Type is required.");
expect(cuisineTypeError.textContent).toBe("Cuisine Type is required.");

})
test("Using a number Smaller than 11 digits" , () =>{
    const phoneInput = document.getElementById("phone");
    const phoneError = document.getElementById("phoneError");
    phoneInput.value = "010231";
    const continueBtn = document.getElementById("continueBtn");
    continueBtn.click();
        expect(phoneError.textContent).toBe("Please enter a valid phone number.");
    });
    test("Using a number Longer than 11 digits" , () =>{
        const phoneInput = document.getElementById("phone");
        const phoneError = document.getElementById("phoneError");
        phoneInput.value = "0102312421131";
        const continueBtn = document.getElementById("continueBtn");
        continueBtn.click();
        expect(phoneError.textContent).toBe("Please enter a valid phone number.");
    })
    test("Toggeling the Eye click" , ()=>{
        const eyeToggle = document.getElementById('eyeToggle');
        const confirmEyeToggle = document.getElementById('confirmEyeToggle');
        const passwordField = document.getElementById('password');
        const confirmpassInput = document.getElementById('confirmPassword');
        const password = 'omar';
        passwordField.value = password;
        confirmpassInput.value = password;

	    eyeToggle.click();
	    expect(passwordField.type).toBe("text");

	    eyeToggle.click();
	    expect(passwordField.type).toBe("password");

        confirmEyeToggle.click();
	    expect(confirmpassInput.type).toBe("text");

	    confirmEyeToggle.click();
	    expect(confirmpassInput.type).toBe("password");

	});
test.each([
  ["asdasd_21332" , "omar"],
  ["omar2005" , "omar"]
])('Putting an unmatched passwords', (password , password2) =>{
        const continuebutton = document.getElementById('continueBtn');
        
        const passwordError = document.getElementById('passwordError'); 
		const passwordField = document.getElementById("password");
        
        const confirmPasswordError = document.getElementById('confirmPasswordError');
        const confirmpassInput     = document.getElementById('confirmPassword');
        
        passwordField.value = password;
        confirmpassInput.value = password2;;        
        
        continuebutton.click();
        
        expect(passwordError.textContent).toBe("");
        expect(confirmPasswordError.textContent).toBe("password doesn't match.");
    })
    test('Business name Empty' , ()=>{
        const continuebutton = document.getElementById('continueBtn');
        const businessTypeError = document.getElementById("businessTypeError");
        continuebutton.click();
        expect(businessTypeError.textContent).toBe("Business Type is required.");
    })
    test('Store name Empty' , ()=>{
        const continuebutton = document.getElementById('continueBtn');
        const storeNameError = document.getElementById("storeNameError");
        continuebutton.click();
        expect(storeNameError.textContent).toBe("Store Name is required.");
    })
    test('Cusine name Empty' , ()=>{
        const continuebutton = document.getElementById('continueBtn');
        const cuisineTypeError = document.getElementById("cuisineTypeError");
        continuebutton.click();
         expect(cuisineTypeError.textContent).toBe("Cuisine Type is required.");
    })
})