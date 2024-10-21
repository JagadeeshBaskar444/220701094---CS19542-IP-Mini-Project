<?php
include 'db.php'; // Ensure this path is correct
session_start();

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    // Check if the user is logged in
    if (!isset($_SESSION['user_id'])) {
        header("Location: ../login.html");
        exit();
    }

    // Retrieve and sanitize input values
    $user_id = $_SESSION['user_id'];
    $number_of_people = isset($_GET['people']) ? (int)$_GET['people'] : 0; // Cast to integer
    $checkin_date = isset($_GET['checkin']) ? $_GET['checkin'] : null;
    $checkout_date = isset($_GET['checkout']) ? $_GET['checkout'] : null;
    $food_service = isset($_GET['food']) ? 1 : 0;

    // Validate required fields
    if ($number_of_people <= 0 || !$checkin_date || !$checkout_date) {
        echo "Please provide valid booking details.";
        exit();
    }

    // Prepare the SQL statement
    $stmt = $conn->prepare("INSERT INTO bookings (user_id, number_of_people, checkin_date, checkout_date, food_service) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("iissi", $user_id, $number_of_people, $checkin_date, $checkout_date, $food_service);

    // Execute the statement and check for success
    if ($stmt->execute()) {
        $booking_id = $stmt->insert_id;
        $_SESSION['booking_id'] = $booking_id; // Store booking_id in session for payment

        // Redirect to payment page
        header("Location: /hotel-booking-system/frontend/payment.html?booking_id=$booking_id");
        exit(); // Always use exit after a header redirect
    } else {
        echo "Booking failed: " . $stmt->error; // Output error for debugging
    }

    // Close statement and connection
    $stmt->close();
}
$conn->close();
?>
