<?php
session_start();
include 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve booking details
    $people = $_POST['people'];
    $checkin = $_POST['checkin'];
    $checkout = $_POST['checkout'];
    $food = $_POST['food'];

    // Retrieve payment details
    $name_on_card = $_POST['name_on_card'];
    $card_number = $_POST['card_number'];
    $expiry = $_POST['expiry'];
    $cvv = $_POST['cvv'];
    $payment_method = $_POST['payment_method'];

    // Store payment information (you may add logic to process payment through a payment gateway here)
    $stmt = $conn->prepare("INSERT INTO payments (name_on_card, card_number, expiry, cvv, payment_method) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $name_on_card, $card_number, $expiry, $cvv, $payment_method);

    if ($stmt->execute()) {
        echo "Payment Successful! Your booking is confirmed.";
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
}
?>
