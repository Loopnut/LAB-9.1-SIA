<?php
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Job Details - Job Portal</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <nav class="navbar">
        <div class="container">
            <h1>Job Portal</h1>
            <ul class="nav-links">
                <li><a href="index.php">Home</a></li>
                <li><a href="jobs.php">Job Listings</a></li>
            </ul>
        </div>
    </nav>

    <main class="container">
        <section class="job-detail-section">
            <a href="jobs.php" class="back-link">&larr; Back to Job Listings</a>
            
            <p id="loading-message">Loading job details...</p>
            
            <div id="job-detail-container" class="job-detail-container">
                <!-- Job details will be inserted here by JavaScript -->
            </div>

            <div id="error-message" class="error-message" style="display: none;">
                <!-- Error message will appear here if data fetch fails -->
            </div>
        </section>
    </main>

    <footer>
        <p>&copy; 2026 Job Portal. All rights reserved.</p>
    </footer>

    <script src="job-detail.js"></script>
</body>
</html>
