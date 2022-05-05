const fs = require('fs');
const moment = require('moment-timezone');

const helper = {

    getTableMapping: (table) => {
        let temp;
        let mapping;
        fs.readFile(`./json/${table}.json`,(err, data) => {
            temp = JSON.parse(data);
            mapping = temp;
        });
        return mapping;
    },
    getDateRange: () => {
        let dateArr = [];
        let curr = moment().tz('America/Chicago').format('YYYY-MM-DD');
        dateArr.push(curr);
        for (let i = 0; i < 5; i++) {
            curr = moment(curr).subtract(1,"day").format('YYYY-MM-DD');
            dateArr.push(curr);
        }
        return dateArr;
    }
}

export default helper;