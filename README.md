# Job Listings Web Application - Setup Guide

## Overview
This web application displays job listings fetched from your Supabase database. The application includes:
- **index.html** - Home page with navigation
- **jobs.html** - Job listings page
- **jobs.js** - JavaScript code to fetch and display jobs from Supabase
- **style.css** - Responsive styling for the entire application

## Prerequisites
Before running this application, you need:
1. A Supabase project with a `jobs` table
2. Your Supabase project URL
3. Your Supabase anonymous public key (API key)

## Setup Instructions

### Step 1: Create Supabase Table
In your Supabase dashboard, create a table called `jobs` with the following columns:
- `id` (UUID, primary key, auto-generated)
- `title` (text, required)
- `company` (text, required)
- `description` (text)
- `location` (text)
- `salary` (text)
- `job_type` (text) - e.g., "Full-time", "Part-time", "Contract"
- `created_at` (timestamp, auto-generated)

### Step 2: Add Sample Data
Insert sample job listings into your Supabase `jobs` table through the dashboard.

### Step 3: Configure the Application
Edit the `jobs.js` file and update the `SUPABASE_PROJECT_ID` variable:

```javascript
const SUPABASE_PROJECT_ID = 'YOUR_PROJECT_ID'; // Replace with your actual project ID
```

Your Supabase project ID can be found in your project's settings or in the project URL:
- Project URL format: `https://YOUR_PROJECT_ID.supabase.co`

The API key is already configured:
```javascript
const SUPABASE_ANON_KEY = 'sb_publishable_U3_DgHx7_gB6FjTQ9K5iwA_nk6hyaFl';
```

### Step 4: Run the Application
1. Place these files in your web server directory (e.g., `c:\xampp\htdocs\Lab 9 SIA\`)
2. Access the application through your browser:
   - Home page: `http://localhost/Lab%209%20SIA/index.html`
   - Job listings: `http://localhost/Lab%209%20SIA/jobs.html`

## Features

### Job Listings Display
- **Responsive Grid Layout**: Jobs are displayed in a responsive grid that adapts to different screen sizes
- **Job Cards**: Each job is displayed as a card showing:
  - Job title
  - Company name
  - Location
  - Job type
  - Salary
  - Job description (preview)
  - "View Details" button

### Error Handling
- The application includes error handling for network failures
- Users are notified if jobs cannot be fetched from Supabase
- Detailed error messages help with troubleshooting

### Security
- The code includes HTML escaping to prevent XSS (Cross-Site Scripting) attacks
- The Supabase API key is configured securely

## File Structure
```
Lab 9 SIA/
├── index.html          # Home page
├── jobs.html           # Job listings page
├── jobs.js             # JavaScript to fetch and display jobs
├── style.css           # Stylesheet
└── README.md           # This file
```

## Troubleshooting

### Jobs Not Loading
1. **Check Supabase Project ID**: Ensure `SUPABASE_PROJECT_ID` in `jobs.js` is correct
2. **Check API Key**: Verify that `SUPABASE_ANON_KEY` matches your Supabase anonymous key
3. **Check Table Name**: Ensure your Supabase table is named `jobs`
4. **CORS Issues**: If you see CORS errors, check that your Supabase project has CORS enabled
5. **Network Issues**: Open browser console (F12) to see detailed error messages

### Styling Issues
- Clear your browser cache (Ctrl+F5) if styles don't appear correctly
- Check that `style.css` is in the same directory as the HTML files

## References
- [Supabase Documentation](https://supabase.com/docs)
- [Fetch API - MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
- [JSON Parsing with JavaScript](https://www.xjavascript.com/blog/how-to-parse-json-data-with-jquery-javascript/)

## Future Enhancements
- Add job search and filtering functionality
- Implement job application form
- Add admin page to manage job listings
- Implement user authentication
- Add job bookmarking/favoriting feature
- Show detailed job view in a modal
