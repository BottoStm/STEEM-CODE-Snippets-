const steem = require("steem");

// Function to get the internal market data
async function getInternalMarketData() {
  try {
    // Get ticker data from the internal market
    const ticker = await steem.api.getTickerAsync();

    // Extract the prices from the ticker data
    const steemToSbd = ticker.latest; // STEEM to SBD price
    const sbdToSteem = 1 / ticker.latest; // SBD to STEEM price (inverse)

    console.log(`STEEM to SBD: ${steemToSbd}`);
    console.log(`SBD to STEEM: ${sbdToSteem.toFixed(6)}`);
  } catch (error) {
    console.error("Error fetching market data:", error);
  }
}

// Ensure that steemjs library is properly configured for async/await
steem.api.getTickerAsync = () => {
  return new Promise((resolve, reject) => {
    steem.api.getTicker((err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

// Call the function to get the market data
getInternalMarketData();
