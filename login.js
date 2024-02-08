function validateForm() {
    var password = document.getElementById("psw").value;
    var confirmPassword = document.getElementById("confirmPsw").value;
    var email = document.getElementById("email").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return false;
    }

    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailPattern.test(email) || !email.endsWith('.com')) {
        alert("Invalid email format. Email must end with '.com'.");
        return false;
    }

    return true;
}


function togglePasswordVisibility() {
    var passwordInput = document.getElementById("psw");
    var showIcon = document.getElementById("show");
    var hideIcon = document.getElementById("hide");

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        showIcon.style.display = "none";
        hideIcon.style.display = "inline";
    } else {
        passwordInput.type = "password";
        showIcon.style.display = "inline";
        hideIcon.style.display = "none";
    }
}

document.getElementById("form").onsubmit = function() {
    if (validateForm()) {
        alert("Form submitted successfully");
        // document.getElementById("successAlert").style.display = "block";
        return true;
    }
    return false;
};

document.getElementById("showPassword").onclick = function() {
    togglePasswordVisibility();
};