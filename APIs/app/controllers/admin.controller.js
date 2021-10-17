const db = require("../models");
const sanitize = require('mongo-sanitize');
const Ads = db.ads;

exports.addAds = async (req, res) => {
    try {
        if (req.files.length > 0) {
            const ads = new Ads({
                title: sanitize(req.body.title),
                path: req.files[0].location,
                link: sanitize(req.body.link)
            })
            await ads.save()
            return res.status(200).send(ads)
        }
        return res.status(404).send({message: "Image not found"})
    }
    catch (err) {
        return res.status(500).send({message: "Internal Server Error"})
    }
};

exports.editAds = async (req, res) => {
    try {
        const ads = await Ads.findById(sanitize(req.body.adsID))
        if (!ads) {
            return res.status(404).send({message: "Ads not found"})
        }
        if (req.files.length > 0) {
            ads.path = req.files[0].location
        }
        if(req.body.title) {
            ads.title = sanitize(req.body.title)
        }
        if (req.body.link) {
            ads.link = sanitize(req.body.link)
        }
        await ads.save()
        return res.status(200).send(ads)
    }
    catch (err) {
        return res.status(500).send({message: "Internal Server Error"})
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
        return res.status(500).send({message: "Internal Server Error"})
    }
};