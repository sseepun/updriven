const path = require('path');
const root = path.dirname(require.main.filename);
const db = require("../models");
const fs = require("fs");
const Category = db.category;
;
exports.initial = async () => {
    try { 
        const category_count = await Category.countDocuments({})
        if (category_count === 0) {
            const category_data = JSON.parse(fs.readFileSync(root + '/app/assets/categories.json', 'utf8'));
            await Category.insertMany(category_data)
            console.log("added category_data to Category collection")
        }
    }
    catch (err) {
        console.log(err)
    }
}

