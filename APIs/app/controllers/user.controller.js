const global_functions = require("./modules/global_function");
const db = require("../models");
const sanitize = require('mongo-sanitize');
const User = db.user;
const Organization = db.organization;
const Notification = db.notification;
const Follow = db.follow;

exports.editInfo = async (req, res) => {
    try {
        const user = await User.findById(req.userId).populate('user_detail')
        interests_list = req.body.interests.split(",");
        user.user_detail[0].interests = interests_list;
        user.user_detail[0].firstname = req.body.firstname;
        user.user_detail[0].lastname = req.body.lastname;
        user.user_detail[0].state_id = req.body.state_id;
        user.user_detail[0].country_id = req.body.country_id;
        user.user_detail[0].about_us = req.body.about;
        const organization = await Organization.findOne({ name: req.body.organization })
        if (user.user_detail[0].organization.length > 0) {
            user.user_detail[0].organization = []
        }
        if (organization) {
            user.user_detail[0].organization.push(organization._id)
            await user.user_detail[0].save();
            res.status(200).send({message: 'edit info successful'});
        }
        else {
            const organization = new Organization({
                name: req.body.organization,
                type: "School"
            });
            await organization.save();
            user.user_detail[0].organization.push(organization._id)
            await user.user_detail[0].save();
            res.status(200).send({message: 'edit info successful'});
        }
    }
    catch (err) {
        return res.status(500).send({message: "Internal Server Error"})
    }
}

exports.viewOtherUserInfo = async (req, res) => {
    try {
        const user = await User.findById(sanitize(req.params.userID)).populate([
            {
                path: 'role'
            },
            {
                path: 'user_detail', 
            }
        ])

        
        return res.status(200).send(user);
    }
    catch (err) {
        return res.status(500).send({message: "Internal Server Error"})
    }
}

exports.updateProfileImage = async (req, res) => {
    try {
        const user = await User.findById(req.userId).populate('user_detail')
        if (req.files.length > 0) {
            user.user_detail[0].profile_pic = req.files[0].location
            await user.user_detail[0].save();
            res.status(200).send(user);
        }
        else {
            res.status(404).send({message: 'No image found'});
        }
    }
    catch (err) {
        return res.status(500).send({message: "Internal Server Error"})
    }
}

exports.updateBackground = async (req, res) => {
    try {
        const user = await User.findById(req.userId).populate('user_detail')
        if (req.files.length > 0) {
            user.user_detail[0].background_pic = req.files[0].location
            await user.user_detail[0].save();
            res.status(200).send(user);
        }
        else {
            res.status(404).send({message: 'No image found'});
        }
    }
    catch (err) {
        return res.status(500).send({message: "Internal Server Error"})
    }
}

exports.posts = async (req, res) => {
    try {
        const user = await User.findById(sanitize(req.body.userID))
        const post_data = await global_functions.getPost(req, user)
        return res.status(200).send(post_data)
    }
    catch (err) {
        return res.status(500).send({message: "Internal Server Error"})
    }
}

exports.imageList = async (req, res) => {
    try {
        const user = await User.findById(sanitize(req.body.userID))
        image_list = await global_functions.getImage(req, user)
        return res.status(200).send(image_list)
    }
    catch (err) {
        return res.status(500).send({message: "Internal Server Error"})
    }
}

exports.follow = async (req, res) => {
    try {
        const user = await User.findById(req.userId)
        const user_to_follow = await User.findById(sanitize(req.body.userID))
        const check_followed = await Follow.findOne({user: user, follow: user_to_follow})
        if (user.equals(user_to_follow)) {
            return res.status(403).send({message: "cannot follow yourself"})
        }
        if (check_followed) {
            return res.status(403).send({message: "already follow"})
        }
        const follow_data = new Follow({
            user: user,
            follow: user_to_follow
        });
        await follow_data.save()
        if (!user.following) {
            user.following = 0;
        }
        if (!user_to_follow.Followed) {
            user_to_follow.Followed = 0;
        }
        user.following += 1;
        user_to_follow.Followed += 1;
        await user.save()
        await user_to_follow.save()
        return res.status(200).send({message: "Follow successful"})
    }
    catch (err) {
        return res.status(500).send({message: "Internal Server Error"})
    }
}

exports.unfollow = async (req, res) => {
    try {
        const user = await User.findById(req.userId)
        const user_to_unfollow = await User.findById(sanitize(req.body.userID))
        const check_followed = await Follow.findOne({user: user, follow: user_to_unfollow})
        if (user.equals(user_to_unfollow)) {
            return res.status(403).send({message: "cannot unfollow yourself"})
        }
        if (!check_followed) {
            return res.status(403).send({message: "not follow"})
        }
        await Follow.deleteOne({user: user, follow: user_to_unfollow})
        user.following -= 1;
        user_to_unfollow.Followed -= 1;
        await user.save()
        await user_to_unfollow.save()
        return res.status(200).send({message: "Unfollow successful"})
    }
    catch (err) {
        return res.status(500).send({message: "Internal Server Error"})
    }
}

exports.following_list = async (req, res) => {
    try {
        const user = await User.findById(sanitize(req.body.userID))
        const following_list = await Follow.paginate({
            query: {
                user: user._id
            },
            limit: 10,
            next: req.body.next,
            previous: req.body.previous,
            paginatedField: 'Orderable'
        })
        await Follow.populate(following_list,
            [
                {
                    path: 'results.follow', 
                    model: 'User', 
                    select: 'user_detail', 
                    populate: [
                        {
                            path: 'role'
                        },
                        {
                            path: 'user_detail', 
                            select: ['firstname', 'lastname', 'state_id', 'country_id' , 'profile_pic']
                        }
                    ]
                },
            ]
        );
        return res.status(200).send(following_list)
    }
    catch (err) {
        return res.status(500).send({message: "Internal Server Error"})
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
        return res.status(500).send({message: "Internal Server Error"})
    }
}

exports.deleteNotification = async (req, res) => {
    try {
        const notification = await Notification.deleteOne({ _id: sanitize(req.body.notification_id) })
        if (req.user.notification > 0) {
            req.user.notification -= 1;
        }
        await req.user.save()
        return res.status(200).send({message: "OK"})
    }
    catch (err) {
        return res.status(500).send({message: "Internal Server Error"})
    }
}