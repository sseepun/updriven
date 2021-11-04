const path = require('path');
const root = path.dirname(require.main.filename);
const db = require("../models");
const fs = require("fs");
const Category = db.category;
const Ads = db.ads;

exports.initial = async () => {
    try { 
        const category_count = await Category.countDocuments({})
        const ads_count = await Ads.countDocuments({})
        if (category_count === 0) {
            const category_data = JSON.parse(fs.readFileSync(root + '/app/assets/categories.json', 'utf8'));
            await Category.insertMany(category_data)
            console.log("added category_data to Category collection")
        }
        if (ads_count === 0) {
            await new Ads({
                title: "Ads 1 placeholder",
                path: "default",
                link: "#"
            }).save()
            await new Ads({
                title: "Ads 2 placeholder",
                path: "default",
                link: "#"
            }).save()
            await new Ads({
                title: "Ads 3 placeholder",
                path: "default",
                link: "#"
            }).save()
            console.log("added ads placeholder to Ads collection")
        }
    }
    catch (err) {
        console.log(err)
    }
}

