const db = require("../models");
const User = db.user;
const User_detail = db.user_detail;
const Post = db.post;
const Organization = db.organization;

exports.addOrganization = async (req, res) => {
    try {
        const user = await User.findById(req.userId).populate('user_detail')
        user.user_detail[0].address = req.body.address;
        const organization = await Organization.findOne({ name: req.body.organization })
        if (user.user_detail[0].organization.length > 0) {
            user.user_detail[0].organization = []
        }
        if (!(organization === null)) {
            user.user_detail[0].organization.push(organization._id)
            await user.user_detail[0].save();
            console.log('Add organization successful');
            res.status(200).send({message: 'Add organization successful'});
        }
        else {
            const organization = new Organization({
                name: req.body.organization,
                type: req.body.type,
                start_year : req.body.start_year,
                end_year : req.body.end_year ,
            });
            organization.user_detail.push(user.user_detail[0]._id);
            await organization.save();
            user.user_detail[0].organization.push(organization._id)
            await user.user_detail[0].save();
            console.log('Add organization successful');
            res.status(200).send({message: 'Add organization successful'});
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).send({message: err})
    }
}

exports.posts = async (req, res) => {
    try {
        const user = await User.findById(req.userId)
        const post_list = await Post.paginate({
            query: {
                user: user._id
            },
            limit: 10,
            next: req.body.next,
            previous: req.body.previous,
            paginatedField: 'Orderable'
        })
        await Post.populate(post_list,
            [
                {path: 'results.user', model: 'User', select: 'user_detail', populate: 'user_detail'},
                {path: 'results.category', model: 'Category', select: 'category_name'}
            ])
        res.status(200).send(post_list)
    }
    catch (err) {
        return res.status(500).send({message: err})
    }
}

exports.editInfo = async (req, res) => {
    try {
        const user_detail = await User_detail.findOne({ username: req.userId })
        user_detail.prefix = req.body.prefix;
        user_detail.firstname = req.body.firstname;
        user_detail.lastname = req.body.lastname;
        user_detail.phone = req.body.phone;
        user_detail.address = req.body.address;
        user_detail.province = req.body.province;
        user_detail.gender = req.body.gender;
        user_detail.state_id = req.body.state_id;
        user_detail.country_id = req.body.country_id;
        await user_detail.save()
        res.status(200).send({message: 'User info saved'});
    }
    catch (err) {
        return res.status(500).send({message: err})
    }
}
