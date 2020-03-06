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
            fs.unlinkSync(process.env[APYFY_CONSTS.ENV_VARS.LOCAL_STORAGE_DIR] + '/key_value_stores/default/airbnb-REQUEST_LIST_SOURCES.json');
        } catch(err) {

        }

        const result = [];
        const sources = [
            `https://www.airbnb.com/s/${location}/homes?refinement_paths%5B%5D=%2Fhomes&checkin=${startDate}&checkout=${endDate}&display_currency=USD`
        ];

        const requestList = await Apify.openRequestList('airbnb', sources);

        const crawler = new Apify.CheerioCrawler({
            requestList,
            handlePageFunction: async ({$, request}) => {
                $('div._dx669kc').each((i, el) => {
                    const detailNodeParent = $(el);
                    const detailNode = detailNodeParent.find('div._6kiyebe > div._4ntfzh');
                    const priceNodeParent = detailNodeParent.find('div._6kiyebe > div._viapsj > div._l2ulkt8 > div._vsjqit');
                    const [id] = /[+-]?\d+(\.\d+)?/g.exec($(el).find('a').attr('href'));
                    const info = [detailNodeParent.find('div._1ulsev2').first().text(), detailNodeParent.find('div._1ulsev2').last().text()].join(', ');
                    const link = $(el).find('a').attr('href');

                    result.push(
                        {
                            href: `https://www.airbnb.com${link}`,
                            rating: detailNode.find('span._3zgr580').text(),
                            review: detailNode.find('span._krjbj').last().text(),
                            title: detailNode.find('div._e3iz2fo').text(),
                            subTitle: detailNodeParent.find('div._1jbo9b6h').text(),
                            info,
                            id,
                            price: priceNodeParent.find('span._1llb8an').first().text() + ' USD',
                        }
                    );
                });
            },
        });

        await crawler.run();

        return result;
    }
};