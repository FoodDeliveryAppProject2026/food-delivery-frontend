/**
 * @jest-environment jsdom
 */
const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.resolve(__dirname, '../signup.html'), 'utf8');

describe('Sign Up Test' , () =>{
    beforeEach(() =>{
        document.documentElement.innerHTML = html.toString();
		jest.resetModules();
		require('../js/signup.js');
    });
    test.each([
  ["example", "test", "example123@outlook.com", "asdasd_21332"],
  ["omar", "hisham", "omarhisham@gmail.com", "omar2005"]
])('valid signup data', (first, last, email, password) =>{
        const continuebutton = document.getElementById('continueBtn');
        
        const passwordError = document.getElementById('passwordError'); 
		const passwordField = document.getElementById("password");

		const emailError = document.getElementById('emailError');
		const emailField = document.getElementById("email"); 
        
        const firstNameInput = document.getElementById('firstName');
        const firstNameError = document.getElementById('firstNameError');
        
        const lastNameInput = document.getElementById('lastName');
        const lastNameError = document.getElementById('lastNameError');
        
        const confirmPasswordError = document.getElementById('confirmPasswordError');
        const confirmpassInput     = document.getElementById('confirmPassword');

        firstNameInput.value = first;
        lastNameInput.value = last;
        emailField.value = email;
        passwordField.value = password;
        confirmpassInput.value = password;
        
        continuebutton.click()
		expect(firstNameError.textContent).toBe("");
		expect(lastNameError.textContent).toBe("");
		expect(emailError.textContent).toBe("");
        expect(passwordError.textContent).toBe("");
        expect(confirmPasswordError.textContent).toBe("");
    })

    test("Should Return Error On Empty Submissions" , ()=>{
          const continuebutton = document.getElementById('continueBtn');
        
        const passwordError = document.getElementById('passwordError'); 
		const emailError = document.getElementById('emailError'); 
        const firstNameError = document.getElementById('firstNameError');
        const lastNameError = document.getElementById('lastNameError');
        const confirmPasswordError = document.getElementById('confirmPasswordError');
        
        continuebutton.click();
        
		expect(firstNameError.textContent).toBe("First name is required.");
		expect(lastNameError.textContent).toBe("Last name is required.");
		expect(emailError.textContent).toBe("Please enter your email address.");
        expect(passwordError.textContent).toBe("Please enter your password.");
        expect(confirmPasswordError.textContent).toBe("Please enter a password in the password form");
    })

   test.each([
  ["example", "test", "example123@outlook.com", "asdasd_21332" , "omar"],
  ["omar", "hisham", "omarhisham@gmail.com", "omar2005" , "omar"]
])('Putting an unmatched passwords', (first, last, email, password , password2) =>{
        const continuebutton = document.getElementById('continueBtn');
        
        const passwordError = document.getElementById('passwordError'); 
		const passwordField = document.getElementById("password");

		const emailError = document.getElementById('emailError');
		const emailField = document.getElementById("email"); 
        
        const firstNameInput = document.getElementById('firstName');
        const firstNameError = document.getElementById('firstNameError');
        
        const lastNameInput = document.getElementById('lastName');
        const lastNameError = document.getElementById('lastNameError');
        
        const confirmPasswordError = document.getElementById('confirmPasswordError');
        const confirmpassInput     = document.getElementById('confirmPassword');

        firstNameInput.value = first;
        lastNameInput.value = last;
        emailField.value = email;
        passwordField.value = password;
        confirmpassInput.value = password2;
        
        continuebutton.click()
		expect(firstNameError.textContent).toBe("");
		expect(lastNameError.textContent).toBe("");
		expect(emailError.textContent).toBe("");
        expect(passwordError.textContent).toBe("");
        expect(confirmPasswordError.textContent).toBe("password does not match.");
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
})
