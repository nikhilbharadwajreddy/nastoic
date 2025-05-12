// Common JavaScript functions for Nastoic

// Helper function to show notifications
function showNotification(message, type = 'success') {
  // Check if notification container exists, create if not
  let notificationContainer = document.getElementById('notification-container');
  if (!notificationContainer) {
    notificationContainer = document.createElement('div');
    notificationContainer.id = 'notification-container';
    notificationContainer.style.position = 'fixed';
    notificationContainer.style.top = '20px';
    notificationContainer.style.right = '20px';
    notificationContainer.style.zIndex = '1000';
    document.body.appendChild(notificationContainer);
  }
  
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.style.padding = '12px 20px';
  notification.style.marginBottom = '10px';
  notification.style.borderRadius = '4px';
  notification.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
  notification.style.transition = 'all 0.3s ease';
  notification.style.cursor = 'pointer';
  
  // Set notification color based on type
  if (type === 'success') {
    notification.style.backgroundColor = '#4caf50';
    notification.style.color = 'white';
  } else if (type === 'error') {
    notification.style.backgroundColor = '#f44336';
    notification.style.color = 'white';
  } else if (type === 'warning') {
    notification.style.backgroundColor = '#ff9800';
    notification.style.color = 'white';
  } else {
    notification.style.backgroundColor = '#2196f3';
    notification.style.color = 'white';
  }
  
  notification.textContent = message;
  
  // Add notification to container
  notificationContainer.appendChild(notification);
  
  // Remove notification after 5 seconds
  setTimeout(() => {
    notification.style.opacity = '0';
    notification.style.transform = 'translateX(100%)';
    
    setTimeout(() => {
      notificationContainer.removeChild(notification);
    }, 300);
  }, 5000);
  
  // Allow clicking on notification to dismiss it
  notification.addEventListener('click', () => {
    notification.style.opacity = '0';
    notification.style.transform = 'translateX(100%)';
    
    setTimeout(() => {
      notificationContainer.removeChild(notification);
    }, 300);
  });
}

// Helper function to validate form inputs
function validateForm(formElement) {
  const formData = new FormData(formElement);
  const errors = [];
  
  // Validate each field based on name attribute
  for (const [name, value] of formData.entries()) {
    // Simple validation rules - can be expanded as needed
    switch (name) {
      case 'fullName':
        if (!value.trim()) {
          errors.push('Full name is required');
        }
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          errors.push('Valid email is required');
        }
        break;
      case 'phone':
        if (value && !/^\+?[\d\s()-]{10,15}$/.test(value)) {
          errors.push('Phone number format is invalid');
        }
        break;
    }
  }
  
  return errors;
}

// Function to handle API requests
async function apiRequest(endpoint, method = 'GET', data = null) {
  try {
    // Get session token from Clerk if available
    const token = Clerk.session ? await Clerk.session.getToken() : null;
    
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      }
    };
    
    // Add authorization header if token is available
    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }
    
    // Add request body for POST/PUT requests
    if (data && (method === 'POST' || method === 'PUT')) {
      options.body = JSON.stringify(data);
    }
    
    // Make the request
    const response = await fetch(endpoint, options);
    
    // Parse JSON response
    const result = await response.json();
    
    // Check if request was successful
    if (!response.ok) {
      throw new Error(result.message || 'Request failed');
    }
    
    return result;
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
}
