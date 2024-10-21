<?php
// Database connection parameters
$host = 'localhost';   // Host name
$user = 'root';        // Default user for XAMPP
$password = '';        // Default password for XAMPP (empty by default)
$dbname = 'hotel_booking'; // Database name

// Create a new mysqli connection
$conn = new mysqli($host, $user, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    // Output error message and exit
    die("Connection failed: " . $conn->connect_error);
}

// Optionally set the character set to utf8mb4 for better compatibility
$conn->set_charset("utf8mb4");

// Successful connection
// You can perform further queries or operations here

?>
