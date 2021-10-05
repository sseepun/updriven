const db = require("../models");
const sanitize = require('mongo-sanitize');
const Ads = db.ads;

exports.addAds = async (req, res) => {
    try {
        if (req.files) {
            console.log(req.files)
            const ads = new Ads({
                title: req.body.title,
                path: req.files[0].location
            })
            await ads.save()
            return res.status(200).send({message: "Add ads successfully"})
        }
        return res.status(404).send({message: "Image not found"})
    }
    catch (err) {
        console.log(err)
        return res.status(500).send({message:err})
    }
};

exports.deleteAds = async (req, res) => {
    try {
        const ads_del = await Ads.findByIdAndDelete(sanitize(req.body.adsID))
        if (!ads_del) {
            return res.status(404).send({message: "Ads not found"})
        }
        return res.status(200).send({message: "Delete ads successfully"})
    }
    catch (err) {
        console.log(err)
        return res.status(500).send({message:err})
    }
};