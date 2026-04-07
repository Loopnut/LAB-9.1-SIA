// Supabase Configuration (same as jobs.js)
const SUPABASE_PROJECT_ID = 'rihneddzlsccpytclfyp';
const SUPABASE_URL = `https://${SUPABASE_PROJECT_ID}.supabase.co`;
const SUPABASE_ANON_KEY = 'sb_publishable_U3_DgHx7_gB6FjTQ9K5iwA_nk6hyaFl';

// Function to get job ID from URL parameters
function getJobIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

// Function to fetch a single job from Supabase
async function fetchJobDetail() {
    const jobId = getJobIdFromURL();
    const detailContainer = document.getElementById('job-detail-container');
    const loadingMessage = document.getElementById('loading-message');
    const errorMessage = document.getElementById('error-message');

    // Validate job ID
    if (!jobId) {
        loadingMessage.style.display = 'none';
        errorMessage.style.display = 'block';
        errorMessage.innerHTML = `
            <p><strong>Error:</strong> No job ID provided. Please select a job from the listings page.</p>
        `;
        return;
    }

    try {
        // Fetch single job from Supabase REST API using eq filter
        const response = await fetch(`${SUPABASE_URL}/rest/v1/Jobs?id=eq.${jobId}`, {
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

        // Check if job was found
        if (jobs.length === 0) {
            errorMessage.style.display = 'block';
            errorMessage.innerHTML = `
                <p><strong>Error:</strong> Job not found. The job you're looking for may have been removed.</p>
            `;
            return;
        }

        // Display job details
        displayJobDetail(jobs[0]);

    } catch (error) {
        console.error('Error fetching job detail:', error);
        
        // Hide loading message and show error
        loadingMessage.style.display = 'none';
        errorMessage.style.display = 'block';
        errorMessage.innerHTML = `
            <p><strong>Error loading job details:</strong> ${error.message}</p>
            <p>Please check your connection and try again.</p>
        `;
        
        // Clear detail container
        detailContainer.innerHTML = '';
    }
}

// Function to display job details
function displayJobDetail(job) {
    const detailContainer = document.getElementById('job-detail-container');
    
    // Clear container
    detailContainer.innerHTML = '';

    // Create detail element
    const detailElement = createDetailElement(job);
    detailContainer.appendChild(detailElement);
}

// Function to create job detail element
function createDetailElement(job) {
    const section = document.createElement('section');
    section.classList.add('job-detail');

    // Extract job details
    const position = job.Position || 'Job Position';
    const description = job.Description || 'No description available';
    const salary = job.Salary || 'Salary not specified';
    const endsAt = job.ends_at || 'No deadline specified';
    const createdAt = job.created_at || '';
    const id = job.id || '';

    // Format dates
    const formattedEndsAt = formatDate(endsAt);
    const formattedCreatedAt = formatDate(createdAt);

    section.innerHTML = `
        <div class="detail-header">
            <h1>${escapeHtml(position)}</h1>
        </div>

        <div class="detail-meta">
            <span class="job-id">Job ID: ${id}</span>
            <span class="posted-date">Posted: ${formattedCreatedAt}</span>
        </div>

        <div class="detail-content">
            <section class="detail-section">
                <h2>Description</h2>
                <p>${escapeHtml(description)}</p>
            </section>

            <section class="detail-section">
                <h2>Job Details</h2>
                <div class="detail-info">
                    <div class="info-item">
                        <strong>Salary:</strong>
                        <span>${escapeHtml(salary)}</span>
                    </div>
                    <div class="info-item">
                        <strong>Application Deadline:</strong>
                        <span>${formattedEndsAt}</span>
                    </div>
                </div>
            </section>

            <section class="detail-section">
                <button class="apply-button apply-button-large" onclick="applyForJob(${id})">Apply Now</button>
            </section>
        </div>
    `;

    return section;
}

// Function to format date
function formatDate(dateString) {
    if (!dateString) return 'Not specified';
    
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    } catch (error) {
        return dateString;
    }
}

// Function to escape HTML special characters (prevent XSS)
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Function to handle job application (can be expanded for future implementation)
function applyForJob(jobId) {
    alert(`Thank you for your interest! Application for Job ID ${jobId} submitted.\n\nThis feature can be expanded to include a full application form.`);
    // In the future, this could open a modal with an application form
    // or redirect to an application page
}

// Call fetchJobDetail when the page loads
document.addEventListener('DOMContentLoaded', function() {
    fetchJobDetail();
});
