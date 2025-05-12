// Script to remove Vercel badge dynamically
(function() {
  function removeVercelElements() {
    // List of selectors that might match Vercel badges
    const selectors = [
      '[data-vercel-badge]',
      '[class*="vercel"]',
      '[id*="vercel"]',
      'a[href*="vercel.com"]',
      'a[href*="vercel.app"]',
      'img[alt*="Vercel"]',
      'img[alt*="vercel"]',
      'a[aria-label*="Vercel"]',
      // Fixed position elements at bottom right (common for Vercel badge)
      'div[style*="position: fixed"][style*="bottom: 0"][style*="right: 0"]',
      // High z-index elements (Vercel badge typically has very high z-index)
      'div[style*="z-index: 999"]'
    ];
    
    // Try to find and remove elements matching these selectors
    selectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => {
        el.remove();
      });
    });
    
    // Also look for iframes that might contain the badge
    document.querySelectorAll('iframe').forEach(iframe => {
      if (iframe.src && iframe.src.includes('vercel')) {
        iframe.remove();
      }
    });
  }
  
  // Run on load
  if (document.readyState === 'complete') {
    removeVercelElements();
  } else {
    window.addEventListener('load', removeVercelElements);
  }
  
  // Also run periodically to catch badges that might be added dynamically
  setInterval(removeVercelElements, 1000);
})();
