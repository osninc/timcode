const AirbnbScrapper = require('./provider/airbnb-scraped');
const ZillowScrapper = require('./provider/zillow-scraped');

const providers = {
  airbnb: (params) => AirbnbScrapper.execute(params),
  zillow: (params) => ZillowScrapper.execute(params),
}

module.exports = {
  fetchFromProvider(provider, params) {
    return providers[provider] ? providers[provider](params) : new Promise((rs) => rs([]));
  },

  fetchData(params = {}) {
    const provider = (params.serviceProvider && params.serviceProvider.toLowerCase()) || false;

    if (!provider) {
      reject('No service provider received');
    }

    return this.fetchFromProvider(provider, params);
  },
};
