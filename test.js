<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dropdown Form Validation</title>


    <style>
        /* Styles for the hidden contact list container */
        .contact-list {
            position: absolute;
            background-color: white;
            border: 1px solid #ccc;
            max-height: 200px;
            overflow-y: auto;
            display: none;
            z-index: 1000;
            /* Ensure it appears on top of other content */
        }

        /* Styles for the dropdown icon */
        .dropdown-icon {
            position: absolute;
            top: 50%;
            right: 10px;
            transform: translateY(-50%);
            pointer-events: none;
        }

        /* Add more CSS styles as needed */

        /* Show the contact list when the container is active */
        .custom-dropdown.active+.contact-list {
            display: block;
        }

        /* Hide the default dropdown arrow */
        .custom-dropdown select {
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            background-color: transparent;
            border: none;
            width: 100%;
        }

        /* Style the selected option */
        .custom-dropdown select option:checked {
            background-color: #f0f0f0;
            /* Change to your desired style */
        }
    </style>
</head>

<body>

    <div class="task-category">
        <label for="selectAssignedContactList">Select an assigned contact:</label>
        <div class="custom-dropdown">
            <select id="selectAssignedContactList" name="assignedContact" required>
                <option value="">Select an assigned contact</option>
                <option value="contact1">Daniel White</option>
                <option value="contact2">Eva Green</option>
                <!-- Add more contact options here -->
            </select>
            <img src="./assets/icons/arrow-drop.svg" class="dropdown-icon" alt="Dropdown Icon">
        </div>
    </div>

    <!-- Hidden contact list container -->
    <div id="contactListContainer" class="contact-list hidden">
        <!-- Contact list items here -->
        <!-- Example for one contact item: -->
        <div onclick="selectTaskContact(this)" id="assignableContact0" class="assign-contact-option">
            <!-- Contact information here -->
        </div>
    </div>


    <script>
        // Toggle the contact list visibility when the dropdown is clicked
        document.getElementById("selectAssignedContactList").addEventListener("click", function () {
            const contactListContainer = document.getElementById("contactListContainer");
            contactListContainer.classList.toggle("hidden");
        });

        // Function to select a contact
        function selectTaskContact(element) {
            // Handle the contact selection logic here
            // You can update the selected option in the dropdown
            // and update the contact list accordingly
        }

    </script>
</body>

</html>