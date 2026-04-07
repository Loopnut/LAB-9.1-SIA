// Supabase Configuration
// Replace YOUR_PROJECT_ID with your actual Supabase project ID
// Your project URL format: https://YOUR_PROJECT_ID.supabase.co
const SUPABASE_PROJECT_ID = 'rihneddzlsccpytclfyp';
const SUPABASE_URL = `https://${SUPABASE_PROJECT_ID}.supabase.co`;
const SUPABASE_ANON_KEY = 'sb_publishable_U3_DgHx7_gB6FjTQ9K5iwA_nk6hyaFl';

// Function to fetch jobs from Supabase
async function fetchJobs() {
    const jobsContainer = document.getElementById('jobs-container');
    const loadingMessage = document.getElementById('loading-message');
    const errorMessage = document.getElementById('error-message');

    try {
        // Fetch data from Supabase REST API
        const response = await fetch(`${SUPABASE_URL}/rest/v1/Jobs`, {
            headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
            }
        });

        // Check if response is successful
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse JSON data
        const jobs = await response.json();

        // Clear loading message
        loadingMessage.style.display = 'none';

        // Check if jobs array is empty
        if (jobs.length === 0) {
            jobsContainer.innerHTML = '<p class="no-jobs">No job listings available at this time.</p>';
            return;
        }

        // Display jobs
        displayJobs(jobs);

    } catch (error) {
        console.error('Error fetching jobs:', error);
        
        // Hide loading message and show error
        loadingMessage.style.display = 'none';
        errorMessage.style.display = 'block';
        errorMessage.innerHTML = `
            <p><strong>Error loading job listings:</strong> ${error.message}</p>
            <p>Please make sure your Supabase project ID is correctly configured in jobs.js (SUPABASE_PROJECT_ID variable).</p>
        `;
        
        // Clear jobs container
        jobsContainer.innerHTML = '';
    }
}

// Function to display jobs in the webpage
function displayJobs(jobs) {
    const jobsContainer = document.getElementById('jobs-container');
    
    // Clear container
    jobsContainer.innerHTML = '';

    // Loop through each job and create a card
    jobs.forEach(job => {
        const jobCard = createJobCard(job);
        jobsContainer.appendChild(jobCard);
    });
}

// Function to create a job card element
function createJobCard(job) {
    const card = document.createElement('div');
    card.classList.add('job-card');

    // Extract job details from your Supabase schema
    const position = job.Position || 'Job Position';
    const description = job.Description || 'No description available';
    const salary = job.Salary || 'Salary not specified';
    const endsAt = job.ends_at || 'No deadline specified';
    const id = job.id || '';

    // Create card HTML
    card.innerHTML = `
        <div class="job-header">
            <h3>${escapeHtml(position)}</h3>
        </div>
        <div class="job-details">
            <p><strong>Salary:</strong> ${escapeHtml(salary)}</p>
            <p><strong>Deadline:</strong> ${escapeHtml(endsAt)}</p>
        </div>
        <div class="job-description">
            <p>${escapeHtml(description.substring(0, 150))}${description.length > 150 ? '...' : ''}</p>
        </div>
        <button class="apply-button" onclick="viewJobDetails(${id})">View Details</button>
    `;

    return card;
}

// Function to escape HTML special characters (prevent XSS)
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Function to view job details - navigate to detail page
function viewJobDetails(jobId) {
    window.location.href = `job-detail.php?id=${jobId}`;
}

// Call fetchJobs when the page loads
document.addEventListener('DOMContentLoaded', function() {
    fetchJobs();
});
