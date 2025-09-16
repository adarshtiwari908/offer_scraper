# SBI Card Offers Scraper

A Node.js scraper to extract credit card offers from SBI Card's official website. The scraper uses multiple strategies to fetch offer data including direct HTML parsing and JavaScript variable extraction.

## Features

-  Fast and efficient scraping using axios
-  Multiple extraction strategies for robust data collection
-  Structured JSON output with offer details
-  Error handling and retry mechanisms
-  Debug tools for troubleshooting

## Prerequisites

- Node.js (v14 or higher)

## Installation

1. Clone or download the project:
```bash
git clone https://github.com/adarshtiwari908/offer_scraper.git
cd cardOfferScraper
```

2. Install dependencies:
```bash
npm install
```

## Dependencies

The project uses the following packages:
- `axios` - HTTP client for making requests
- `cheerio` - Server-side jQuery implementation for HTML parsing
- `puppeteer` - Headless browser automation (optional, for advanced scraping)

## Usage

### Basic Scraping

Run the main scraper to fetch current SBI card offers:

```bash
node sbi_offers_scraper.js
```

This will:
- Fetch the SBI offers page
- Extract offer data from JavaScript variables
- Save results to `sbi_offers.json`

### Debug Mode

To troubleshoot or analyze the website structure:

```bash
node debug_scraper.js
```

This will:
- Fetch and save the raw HTML to [debug_page.html](cci:7://file:///c:/Users/adars/cardOfferScraper/debug_page.html:0:0-0:0)
- Analyze page structure and elements
- Display statistics about found elements

## Output Files

### `sbi_offers.json`
Main output file containing structured offer data:
```json
{
  "Brand Name": {
    "validity": "start_date → end_date",
    "description": "Offer description",
    "applies_to_cards": ["card1", "card2"],
    "tnc": "Terms and conditions URL"
  }
}
```

## File Structure

```
cardOfferScraper/
├── sbi_offers_scraper.js    # Main scraper
├── debug_scraper.js         # Debug utilities
├── package.json             # Dependencies
├── package-lock.json        # Lock file
├── .gitignore              # Git ignore rules
├── sbi_offers.json         # Output data
└── debug_page.html         # Debug HTML (generated)
```

This project is for educational purposes. Please ensure compliance with applicable laws and website terms of service.

---

**Last Updated**: September 2025
**Node.js Version**: 14+
**Status**: Active Development
