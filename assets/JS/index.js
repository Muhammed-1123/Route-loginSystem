let users = JSON.parse(localStorage.getItem('users')) || [];
let currentUser = JSON.parse(localStorage.getItem('currentUser'));

if (location.pathname.endsWith("index.html") || location.pathname.endsWith("/")) {
    // check if there is a current user in local storage redirect to home page
    if (currentUser !== null) {
        location.href = "./assets/home.html";
    }
    // Get DOM elements 
    const loginBtn = document.getElementById("loginBtn");
    const registerBtn = document.getElementById("registerBtn");
    const joinBtn = document.getElementById("joinBtn");
    // Event listener for the "Login" button
    loginBtn.addEventListener("click", () => {
        location.href = "./assets/login.html";
    });
    // Event listener for the "Join" button
    joinBtn.addEventListener("click", () => {
        location.href = "./assets/register.html";
    });
    // Event listener for the "Register" button
    registerBtn.addEventListener("click", () => {
        location.href = "./assets/register.html";
    });
}
else if (location.pathname.endsWith("register.html")) {
    // signup logic
    const signInBtn = document.getElementById("signInBtn");
    const signUpBtn = document.getElementById("signUpBtn");
    const userName = document.getElementById("userName");
    const userEmail = document.getElementById("userEmail");
    const userPassword = document.getElementById("userPassword");
    const registerBtn = document.getElementById("registerBtn");
    const notificationError = document.getElementById("notificationError");
    const notificationSuccess = document.getElementById("notificationSuccess");
    const notificationWarning = document.getElementById("notificationWarning");

    // Event listener for the "Sign In" button and "Sign Up" button
    signInBtn.addEventListener("click", () => {
        location.href = "./login.html";
    });
    signUpBtn.addEventListener("click", () => {
        location.href = "./register.html";
    });

    // Event listener for the "Register" button 
    registerBtn.addEventListener("click", function (e) {
        e.preventDefault();
        registerUser();
        
    });
    // Function to register a new user and store it in local storage
    function registerUser() {
        const user = {
            userName: userName.value,
            userEmail: userEmail.value,
            userPassword: userPassword.value,
        };
        // check if user name is valid
        if (showNotification(user)) return;
        clearInputFields();
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));
        setTimeout(() => {
            location.href = "./login.html";
        }, 3000);
    }

    // Function to show notification if the input data is invalid or if the user already exists or not
    function showNotification(user) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
        const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_ ]{2,15}$/;
        const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\S+$).{8,20}$/;
        if (
            !emailRegex.test(user.userEmail) ||
            !usernameRegex.test(user.userName) ||
            !passwordRegex.test(user.userPassword)
        ) {
            notificationError.classList.remove("d-none");
            setTimeout(() => {
                notificationError.classList.add("d-none");
            }, 3000)
            return true;
        } else if (users.find(u => u.userEmail === user.userEmail)
        ) {
            notificationWarning.classList.remove("d-none");
            setTimeout(() => {
                notificationWarning.classList.add("d-none");
            }, 3000)
            return true;
        }
        else {
            notificationSuccess.classList.remove("d-none");
            setTimeout(() => {
                notificationSuccess.classList.add("d-none");
            }, 3000)
            return false;
        }
    }

    userEmail.addEventListener("input", () => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
        if (emailRegex.test(userEmail.value)) {
            userEmail.classList.add("is-valid");
            userEmail.classList.remove("is-invalid");
        } else {
            userEmail.classList.remove("is-valid");
            userEmail.classList.add("is-invalid");
        }
    })

    userName.addEventListener("input", () => {

        const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_ ]{2,15}$/;
        if (usernameRegex.test(userName.value)) {
            userName.classList.add("is-valid");
            userName.classList.remove("is-invalid");
        } else {
            userName.classList.remove("is-valid");
            userName.classList.add("is-invalid");
        }
    })

    userPassword.addEventListener("input", () => {
        const passwordHelp = document.getElementById("passwordHelp");
        passwordHelp.classList.remove("d-none");
        passwordHelp.classList.add("text-danger");
        const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\S+$).{8,20}$/;
        if (passwordRegex.test(userPassword.value)) {
            passwordHelp.classList.add("d-none");
            userPassword.classList.add("is-valid");
            userPassword.classList.remove("is-invalid");
        } else {
            passwordHelp.classList.remove("d-none");
            userPassword.classList.remove("is-valid");
            userPassword.classList.add("is-invalid");
        }
    })


    // Function to clear input fields
    function clearInputFields() {
        userName.value = "";
        userEmail.value = "";
        userPassword.value = "";
    }
}
else if (location.pathname.endsWith("login.html")) {
    // login logic 
    // Get DOM elements
    const signInBtn = document.getElementById("signInBtn");
    const signUpBtn = document.getElementById("signUpBtn");
    const loginInputEmail = document.getElementById("loginEmail");
    const loginInputPassword = document.getElementById("loginPassword");
    const loginBtn = document.getElementById("loginBtn");
    const notificationError = document.getElementById("notificationError");
    const errorMsg = document.getElementById("errorMsg");
    // Event listener for the "Sign In" button and "Sign Up" button 
    signInBtn.addEventListener("click", () => {
        location.href = "./login.html";
    });
    signUpBtn.addEventListener("click", () => {
        location.href = "./register.html";
    });

    // check if there is a current user in local storage redirect to home page
    if (currentUser !== null) {
        location.href = "./home.html";
    }

    // Event listener for the "Login" button
    loginBtn.addEventListener("click", (e) => {
        e.preventDefault();
        let user = users.find(u => u.userEmail === loginInputEmail.value && u.userPassword === loginInputPassword.value);
        // check if there is a current user in local storage redirect to home page 
        if (user) {
            localStorage.setItem("currentUser", JSON.stringify(user));
            console.log(user);
            location.href = "./home.html";
        }
        // check if email or password is empty and display error message
        else if (loginInputPassword.value === "" || loginInputEmail.value === "") {
            errorMsg.textContent = "Enter your email and password";
            notificationError.classList.remove("d-none");
            setTimeout(() => {
                notificationError.classList.add("d-none");
            }, 3000)
        }
        // check if email is sign up before and display error message 
        else if (!users.find(u => u.userEmail === loginInputEmail.value)) {
            errorMsg.textContent = "please, Register first to login";
            notificationError.classList.remove("d-none");
            setTimeout(() => {
                notificationError.classList.add("d-none");
            }, 3000)
        }
        // check if email or password is invalid and display error message
        else {
            errorMsg.textContent = "Invalid Email or Password";
            notificationError.classList.remove("d-none");
            setTimeout(() => {
                notificationError.classList.add("d-none");
            }, 3000)
        }
    });
}
else if (location.pathname.endsWith("home.html")) {
    // home logic
    const userNameMsg = document.getElementById("userNameMsg");
    // check if there is a current user in local storage and display their user name on the page
    if (!currentUser) {
        location.href = "../index.html";
    } else {
        userNameMsg.textContent = currentUser.userName;
    }
    const logoutBtn = document.getElementById("logoutBtn");
    // Event listener for the "Logout" button to remove the current user from local storage 
    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("currentUser");
        location.replace("../index.html");
    });

}








