const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

async function debugSbiWebsite() {
  try {
    console.log('Fetching SBI offers page...');
    const response = await axios.get('https://www.sbicard.com/en/personal/offers.page');
    const $ = cheerio.load(response.data);
    
    console.log('Page title:', $('title').text());
    console.log('Total elements:', $('*').length);
    
    // Save HTML for inspection
    fs.writeFileSync('debug_page.html', response.data);
    console.log('HTML saved to debug_page.html');
    
    // Look for common offer-related patterns
    const patterns = [
      '.offer', '.card', '.promotion', '.deal',
      '[class*="offer"]', '[class*="card"]', '[class*="promo"]',
      '.so-card-block', '.offer-card', '.card-offer'
    ];
    
    patterns.forEach(pattern => {
      const elements = $(pattern);
      if (elements.length > 0) {
        console.log(`Found ${elements.length} elements with selector: ${pattern}`);
        // Show first element's classes and text
        const first = elements.first();
        console.log(`  First element class: ${first.attr('class')}`);
        console.log(`  First element text (first 100 chars): ${first.text().substring(0, 100)}`);
      }
    });
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

debugSbiWebsite();
