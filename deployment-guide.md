# Nastoic Deployment Guide

This guide explains how to deploy the Nastoic website to your domain (nastoic.com).

## Files Structure

```
nastoic.com/
├── index.html       # Login page
├── profile.html     # User details form page
├── css/
│   └── styles.css   # Shared styles
└── js/
    └── app.js       # Shared JavaScript functions
```

## Deployment Steps

### 1. Web Hosting Setup

1. Sign up for a web hosting service that supports static websites (like AWS S3, Netlify, Vercel, GitHub Pages, etc.)
2. Configure your domain (nastoic.com) with your hosting provider
3. Set up SSL certificate for secure HTTPS connections (required for Clerk)

### 2. Upload Files

Upload all files while maintaining the directory structure shown above to your web hosting service.

### 3. Configure Clerk Settings

1. Log in to your Clerk Dashboard
2. Make sure your application's domain is set to nastoic.com
3. Configure the following settings:
   - Add nastoic.com to the list of allowed domains
   - Set the homepage URL to https://nastoic.com
   - Configure sign-in and sign-up settings as needed

### 4. Set up URL Redirects (if needed)

If your hosting platform supports it, configure URL redirects so that:
- Any 404 errors redirect to index.html (for client-side routing)
- Ensure secure connections by redirecting HTTP to HTTPS

### 5. Test the Deployment

1. Visit https://nastoic.com to make sure the login page loads correctly
2. Test the sign-in process
3. Verify that after signing in, you're redirected to the profile page
4. Test filling out and submitting the profile form
5. Test the sign-out functionality

## Additional Configuration Options

### Backend Integration

To save user profile data, you'll need to set up a backend API:

1. Create API endpoints for saving and retrieving user data
2. Update the form submission in profile.html to send data to your API
3. Secure your API with Clerk's JWT verification

### Custom Domain for Clerk

If you want to use a custom subdomain for Clerk (currently set to clerk.nastoic.com):

1. In your Clerk Dashboard, go to Domains settings
2. Follow the instructions to set up your custom domain
3. Update the Clerk script URLs in your HTML files

## Troubleshooting

- If sign-in isn't working, check your Clerk publishable key
- If redirects aren't working, check your hosting platform's URL configuration
- If the pages aren't styled correctly, verify that your CSS paths are correct
