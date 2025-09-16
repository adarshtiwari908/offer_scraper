const axios = require("axios");
const fs = require("fs");
const path = require("path");

const BASE_URL = "https://www.sbicard.com";
const OFFERS_URL = `${BASE_URL}/en/personal/offers.page`;


async function fetchHTML(url) {
  try {
    const { data } = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
        "Referer": "https://www.google.com/",
      },
    });
    return data;
  } catch (err) {
    console.error(`Error fetching ${url}:`, err.message);
    return null;
  }
}

function extractOfferData(html) {
  const regex = /var\s+offerData\s*=\s*(\{[\s\S]*?\});/;
  const match = html.match(regex);

  if (!match) {
    console.error("offerData not found in page");
    return null;
  }

  try {
    return JSON.parse(match[1]);
  } catch (err) {
    console.error("Failed to parse offerData:", err.message);
    return null;
  }
}

function transformOffers(offerData) {
  const offers = {};
  if (!offerData?.offers?.offer) return offers;

  for (const off of offerData.offers.offer) {
    const brand = off.brandName || off.text || off.offerId;

    offers[brand] = {
      validity: `${off.startDate || ""} → ${off.endDate || ""}`,
      description: off.text || "",
      "applies_to_cards": off.card ? off.card.split(",") : [],
      tnc: off.dcrPath
        ? `${BASE_URL}/${off.dcrPath.replace(/^\/+/, "")}`
        : "Not available",
    };
  }
  return offers;
}

(async () => {
  console.log("Starting SBI Offers Scraper...");

  const html = await fetchHTML(OFFERS_URL);
  if (!html) return;

  const offerData = extractOfferData(html);
  if (!offerData) return;

  const offers = transformOffers(offerData);

  const filePath = path.join(__dirname, "sbi_offers.json");
  fs.writeFileSync(filePath, JSON.stringify(offers, null, 2), "utf-8");

  console.log(
    `🎉 Done! Saved ${Object.keys(offers).length} offers to ${filePath}`
  );
})();
