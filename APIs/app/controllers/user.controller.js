const db = require("../models");
const sanitize = require('mongo-sanitize');
const { rawListeners } = require("../models/log/log.model");
const User = db.user;
const User_detail = db.user_detail;
const Post = db.post;
const Organization = db.organization;
const Sentiment = db.sentiment;
const Notification = db.notification;

exports.editInfo = async (req, res) => {
    try {
        console.log(req.files)
        const user = await User.findById(req.userId).populate('user_detail')
        user.user_detail[0].firstname = req.body.firstname;
        user.user_detail[0].lastname = req.body.lastname;
        user.user_detail[0].state_id = req.body.state_id;
        if (req.files.length > 0) {
            console.log('in')
            user.user_detail[0].profile_pic = req.files[0].path
        }
        const organization = await Organization.findOne({ name: req.body.organization })
        if (user.user_detail[0].organization.length > 0) {
            user.user_detail[0].organization = []
        }
        if (!(organization === null)) {
            user.user_detail[0].organization.push(organization._id)
            await user.user_detail[0].save();
            console.log('Add organization successful');
            res.status(200).send({message: 'edit info successful'});
        }
        else {
            const organization = new Organization({
                name: req.body.organization,
                type: "School"
            });
            organization.user_detail.push(user.user_detail[0]._id);
            await organization.save();
            user.user_detail[0].organization.push(organization._id)
            await user.user_detail[0].save();
            console.log('Add organization successful');
            res.status(200).send({message: 'edit info successful'});
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
            limit: 5,
            next: req.body.next,
            previous: req.body.previous,
            paginatedField: 'Orderable'
        })
        await Post.populate(post_list,
            [
                {
                    path: 'results.user', 
                    model: 'User', 
                    select: 'user_detail', 
                    populate: 
                    {
                        path: 'user_detail', 
                        select: ['firstname', 'lastname']
                    }
                },
                {
                    path: 'results.category', 
                    model: 'Category', 
                    select: 'category_name'
                },
                {
                    path: 'results.share', 
                    model: 'Share', 
                    select: 'post',
                    populate:
                    {
                        path: 'post',
                        populate: 
                        [
                            { 
                                path:'category', 
                                select: 'category_name' 
                            }, 
                            { 
                                path: 'user', 
                                select: 'user_detail', 
                                populate: 
                                { 
                                    path: 'user_detail', 
                                    select: ['firstname', 'lastname']
                                }
                            }
                        ]
                    }
                }
                
            ]
        );
        for (let i = 0; i < post_list.results.length; i++) {
            const is_sentiment_post = await Sentiment.findOne({sentiment: post_list.results[i], user: req.user})
            if (is_sentiment_post) {
                post_list.results[i].is_sentiment = true
            }
            else {
                post_list.results[i].is_sentiment = false
            }
        }
        res.status(200).send(post_list)
    }
    catch (err) {
        console.log(err)
        return res.status(500).send({message: err})
    }
}

exports.getNotification = async (req, res) => {
    try {
        const notification = await Notification.find({ action_to_user: req.user }).select(['action_by', 'action_to_content', '_id', 'createdAt', 'action_on'])
        .populate({path: 'action_to', populate: { path: 'user', select: 'user_detail', populate: {path: 'user_detail', select: ['firstname','lastname']} }})
        .populate({path: 'action_by', select: 'user_detail', populate: {path: 'user_detail', select: ['firstname','lastname']}})
        return res.status(200).send(notification)
    }
    catch (err) {
        return res.status(500).send({message: err})
    }
}

exports.deleteNotification = async (req, res) => {
    try {
        const notification = await Notification.deleteOne({ _id: sanitize(req.body.notification_id) })
        if (req.user.notification > 0) {
            console.log('in')
            req.user.notification -= 1;
        }
        await req.user.save()
        return res.status(200).send({message: "OK"})
    }
    catch (err) {
        return res.status(500).send({message: err})
    }
}