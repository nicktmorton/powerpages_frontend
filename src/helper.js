const fs = require('fs');

const helper = {

    getTableMapping: (table) => {
        let temp;
        let mapping;
        fs.readFile(`./json/${table}.json`,(err, data) => {
            temp = JSON.parse(data);
            mapping = temp;
        });
        return mapping;
    }

}

export default helper;