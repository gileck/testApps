module.exports = function () {
    const DBFILE_NAME = __dirname + '/dbFile.json';
    const fs = require('fs');
    const dbFileContent = fs.readFileSync(DBFILE_NAME);
    const data = JSON.parse(dbFileContent);
    console.log(data);
    function updateData() {
        fs.writeFileSync(DBFILE_NAME, JSON.stringify(data));
    }
    function initData(websiteURL) {
        data[websiteURL] = [];
        data[websiteURL][0] = {
            impressions: 0,
            clicks: 0,
            hovers: 0
        };
        data[websiteURL][1] = {
            impressions: 0,
            clicks: 0,
            hovers: 0
        };
        updateData();
    }
    return {
        addImpression(websiteURL, variant) {
            if (!data[websiteURL]) initData(websiteURL);
            data[websiteURL][variant].impressions++;
            updateData();
        },
        addClicks(websiteURL, variant) {
            if (!data[websiteURL]) initData(websiteURL);
            data[websiteURL][variant].clicks++;
            updateData();
        },
        addHover(websiteURL, variant) {
            if (!data[websiteURL]) initData(websiteURL);
            data[websiteURL][variant].hovers++;
            updateData();
        },
        getData(websiteURL) {
            return data[websiteURL];
        },
        getAllData() {
            return data;
        }
    }

}();