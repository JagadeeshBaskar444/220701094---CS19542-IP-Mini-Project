document.addEventListener("DOMContentLoaded", function () {
    // Handle login form with AJAX
    const loginForm = document.querySelector(".login-container form");
    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();  // Prevent form submission
            const email = document.querySelector('input[type="text"]');
            const password = document.querySelector('input[type="password"]');
            let isValid = true;

            // Clear previous error states
            email.classList.remove('error');
            password.classList.remove('error');
            document.querySelector(".error-message").innerHTML = ""; // Clear error message

            // Simple validation
            if (email.value === "") {
                email.classList.add('error');
                document.querySelector(".error-message").innerHTML = "Email is required.";
                isValid = false;
            }
            if (password.value === "") {
                password.classList.add('error');
                document.querySelector(".error-message").innerHTML = "Password is required.";
                isValid = false;
            }

            // If all fields are valid, send AJAX request
            if (isValid) {
                const xhr = new XMLHttpRequest();
                xhr.open("POST", "login.php", true);  // Replace with your login backend script
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

                // Handle response from the server
                xhr.onload = function () {
                    if (xhr.status === 200) {
                        const response = JSON.parse(xhr.responseText);
                        if (response.success) {
                            // Store username in localStorage to use on the home page
                            localStorage.setItem("username", response.username);
                            window.location.href = "home.html";  // Redirect to home page
                        } else {
                            document.querySelector(".error-message").innerHTML = "Invalid credentials.";
                        }
                    } else {
                        document.querySelector(".error-message").innerHTML = "Server error. Please try again later.";
                    }
                };

                // Send email and password to the server
                const data = `email=${encodeURIComponent(email.value)}&password=${encodeURIComponent(password.value)}`;
                xhr.send(data);
            }
        });
    }

    // Handle room booking button click
    const roomButtons = document.querySelectorAll(".room-card .btn");
    if (roomButtons) {
        roomButtons.forEach(button => {
            button.addEventListener("click", function () {
                const roomType = this.parentElement.querySelector("h3").innerText;
                localStorage.setItem("selectedRoom", roomType);
                window.location.href = "payment.html";
            });
        });
    }

    // Handle payment form
    const paymentForm = document.querySelector(".payment-container form");
    if (paymentForm) {
        paymentForm.addEventListener("submit", function (e) {
            e.preventDefault();  // Prevent form submission
            const cardNumber = document.querySelector('input[placeholder="Card Number"]');
            const cardHolder = document.querySelector('input[placeholder="Card Holder Name"]');
            const expiryDate = document.querySelector('input[placeholder="Expiry Date (MM/YY)"]');
            const cvv = document.querySelector('input[placeholder="CVV"]');
            let isValid = true;

            // Clear previous error states
            [cardNumber, cardHolder, expiryDate, cvv].forEach(input => input.classList.remove('error'));
            document.querySelector(".error-message").innerHTML = ""; // Clear error message

            // Validate payment fields
            const cardRegex = /^\d{16}$/;
            const expiryRegex = /^\d{2}\/\d{2}$/;
            const cvvRegex = /^\d{3}$/;

            if (!cardRegex.test(cardNumber.value)) {
                cardNumber.classList.add('error');
                isValid = false;
            }
            if (cardHolder.value === "") {
                cardHolder.classList.add('error');
                isValid = false;
            }
            if (!expiryRegex.test(expiryDate.value)) {
                expiryDate.classList.add('error');
                isValid = false;
            }
            if (!cvvRegex.test(cvv.value)) {
                cvv.classList.add('error');
                isValid = false;
            }

            // If all fields are valid, process payment
            if (isValid) {
                window.location.href = "confirmation.html";
            } else {
                document.querySelector(".error-message").innerHTML = "Please fill in all payment details correctly.";
            }
        });
    }

    // Handle confirmation page
    const confirmationContainer = document.querySelector(".confirmation-container");
    if (confirmationContainer) {
        const selectedRoom = localStorage.getItem("selectedRoom");
        const confirmationText = document.createElement("p");
        confirmationText.innerText = `You have successfully booked the ${selectedRoom}. Thank you!`;
        confirmationContainer.appendChild(confirmationText);
    }

    // Display username on the home page
    const homePageGreeting = document.querySelector(".greeting h2");
    if (homePageGreeting) {
        const username = localStorage.getItem("username");
        if (username) {
            homePageGreeting.innerHTML = `Welcome, ${username}!`;
        } else {
            homePageGreeting.innerHTML = `Welcome, Guest!`;
        }
    }
});
