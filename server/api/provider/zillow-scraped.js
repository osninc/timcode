const Apify = require('apify');
const path = require('path');
const APYFY_CONSTS = require('apify-shared/consts');
const fs = require('fs');

module.exports = {
    execute: async (params) => {
        const {location, startDate, endDate} = params;

        if (!process.env[APYFY_CONSTS.ENV_VARS.LOCAL_STORAGE_DIR] && !process.env[APYFY_CONSTS.ENV_VARS.TOKEN]) {
            const dir = path.join(process.cwd(), '.cache/apify_storage');
            process.env[APYFY_CONSTS.ENV_VARS.LOCAL_STORAGE_DIR] = dir;
        }

        try {
            fs.unlinkSync(process.env[APYFY_CONSTS.ENV_VARS.LOCAL_STORAGE_DIR] + '/key_value_stores/default/zillow-REQUEST_LIST_SOURCES.json');
        } catch (err) {

        }

        const result = [];
        const sources = [
            `https://www.zillow.com/homes/${location.replace(/\s/g, "-")}_rb/rentals/`
        ];
        const requestList = await Apify.openRequestList('zillow', sources);
        const crawler = new Apify.CheerioCrawler({
            requestList,
            handlePageFunction: async ({$, request}) => {
                $('#grid-search-results > ul > li').each((i, el) => {
                    const detailNodeParent = $(el);
                    const detailNode = detailNodeParent.find('article > div.list-card-info');
                    const link = detailNode.find('a');
                    const id = detailNodeParent.find('article').attr('id');

                    const infoResult = [];
                    detailNode.find('div.list-card-heading > ul > li').each(function (index) {
                        infoResult.push($(this).text());
                    });

                    if (link.attr('href')) {
                        result.push(
                            {
                                href: link.attr('href'),
                                address: link.find('address').text(),
                                id,
                                info: infoResult.join('| '),
                                price: detailNode.find('div.list-card-heading > div.list-card-price').text()
                            }
                        );
                    }
                });
            },
        });

        await crawler.run();

        return result;
    }
};
