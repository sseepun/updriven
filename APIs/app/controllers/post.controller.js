const db = require("../models");
const sanitize = require('mongo-sanitize');
const User = db.user;
const Post = db.post;
const Category = db.category;
const Comment = db.comment;
const Sentiment = db.sentiment;
const Share = db.share;
const Notification = db.notification;

exports.createPost = async (req, res) => {
    try {
        const post = new Post({
            user: req.userId,
            subject: req.body.subject,
            content: req.body.content,
            visible_to: req.body.visible_to,
            status: true,
        });
        await post.save();
        if (req.files) {
            req.files.forEach((item, index) => {
                post.media.push({index: index, type: item.mimetype, path: item.location });
            });
        }
        const category = await Category.findOne({ category_name: sanitize(req.body.category)} );
        post.category = category;
        await post.save()
        await Post.populate(post,
            [
                {
                    path: 'user', 
                    model: 'User', 
                    select: 'user_detail', 
                    populate: 
                    {
                        path: 'user_detail', 
                        select:['firstname', 'lastname']
                    }
                }, 
                {
                    path: 'category', 
                    model: 'Category', 
                    select: 'category_name'
                }
            ]
        );
        res.status(200).send({post: post});
    }
    catch (err) {
        console.log(err)
        return res.status(500).send({message: err});
    }
};

exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findById(sanitize(req.body.post_id))
        if (post.user[0].equals(req.userId)) {
            await Post.deleteOne( {_id: post })
            await Comment.deleteMany( { post_id: sanitize(req.body.post_id) })
            const share_holder = await Share.find({post: post})
            await Share.deleteMany({post: post})
            if (share_holder.length > 0) {
                for (i = 0; i < share_holder.length; i++)
                {
                    const children_post = await Post.find({share: share_holder[i]})
                    console.log(children_post._id)
                    let comment_id;
                    if (children_post._id) {
                        comment_id = (children_post._id).toString()
                    }
                    await Post.deleteOne( {_id: children_post })
                    await Comment.deleteMany( { post_id: comment_id })
                    console.log(children_post)
                }
            }
            res.status(200).send({message: "Your post has been deleted"})
        }
        else {
            res.status(403).send({message: "You don't have permission to delete this post"})
        }
    }
    catch (err) {
        console.log(err)
        return res.status(500).send({message: err})
    }
}

exports.sharePost = async (req, res) => {
    try {
        const post_to_share = await Post.findById(sanitize(req.body.post_id))
        const share_post = await new Share({
            user: req.userId,
            post: post_to_share._id
        }).save()
        const post = await new Post({
            user: req.userId,
            share: share_post,
            status: true,
        }).save();
        await Share.populate(post, 
            [
                { 
                    path:'user', 
                    select: 'user_detail', 
                    populate: 
                    {
                        path: 'user_detail', 
                        select: ['firstname', 'lastname']
                    }
                },
                {
                    path: 'share',
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
            ])
        let post_data = post.toObject();
        post_data.is_sentiment = false
        res.status(200).send(post_data);
    }
    catch (err) {
        console.log(err)
        return res.status(500).send({message: err})
    }
}

exports.commentPost = async (req, res) => {
    try {
        let data = {
            post_id: req.body.post_id,
            author: {
                id: req.userId,
                firstname: req.user.user_detail[0].firstname,
                lastname: req.user.user_detail[0].lastname
            },
            comment: req.body.comment
        }
        if ('parent_comment' in req.body) {
            data.parent_comment = req.body.parent_comment
        }
        if ('depth' in req.body) {
            data.depth = req.body.depth
        }
        const comment = new Comment(data);
        await comment.save()
        const post = await Post.findById(req.body.post_id)
        post.comment_count += 1;
        await post.save()
        res.status(200).send({comment: comment})

    }
    catch (err) {
        console.log(err)
        return res.status(500).send({message: err})
    }
}

exports.updateComment = async (req, res) => {
    try {
        let comment = req.body;
        await Comment.updateOne({_id: comment.id}, {$set: {comment: comment.comment}})
        res.status(200).send({
            message: "Comment Updated",
            comment: comment
        })
    }
    catch (err) {
        console.log(err)
        return res.status(500).send({message: err})
    }
}

exports.giveSentiment = async (req, res) => {
    try {
        if (req.body.post_id && req.body.comment_id) {
            res.status(500).send({message: "cannot sentiment on post and comment at the same time"})
        }
        else if (req.body.post_id) {
            const post = await Post.findById(sanitize(req.body.post_id))
            const post_user = await User.findById(post.user[0])
            post.sentiment_count = post.sentiment_count + 1;
            await post.save();
            const sentiment = new Sentiment({
                user: req.userId,
                sentiment: post,
                sentiment_on: 'Post',
                sentiment_type: req.body.sentiment_type
            });
            await sentiment.save();
            if (!(post_user.equals(req.user))) {
                const notification = new Notification({
                    action_to_content: post.id,
                    action_to_user: post_user,
                    action_on: "Post",
                    action_by: req.user
                })
                post_user.notification += 1;
                await post_user.save();
                await notification.save();
            }
            res.status(200).send({message: "give sentiment on post successfully"})
        }
        else if (req.body.comment_id) {
            let comment = await Comment.findById(sanitize(req.body.comment_id))
            let comment_user = await User.findById(comment.author.id)
            comment.sentiment_count = comment.sentiment_count + 1;
            await comment.save();
            const sentiment = new Sentiment({
                user: req.userId,
                sentiment: comment,
                sentiment_on: 'Comment',
                sentiment_type: req.body.sentiment_type
            });
            await sentiment.save();
            if (!(comment_user.equals(req.user))) {
                const notification = new Notification({
                    action_to_content: comment.id,
                    action_to_user: comment_user,
                    action_on: "Comment",
                    action_by: req.user
                })
                comment_user.notification += 1;
                await comment_user.save();
                await notification.save();
            }
            res.status(200).send({message: "give sentiment on comment successfully"})
        }
        else {
            res.status(404).send({message: "post or comment not found"})
        }
    }
    catch (err) {
        console.log(err)
        return res.status(500).send({message: err})
    }
}

exports.removeSentiment = async (req, res) => {
    try {
        let sentiment_on;
        if (req.body.sentiment_on === 'Post') { 
            sentiment_on = await Post.findById(sanitize(req.body.sentiment_id)) 
        }
        else if (req.body.sentiment_on === 'Comment') { 
            sentiment_on = await Comment.findById(sanitize(req.body.sentiment_id)) 
        }
        const sentiment = await Sentiment.deleteOne({sentiment: sentiment_on, user: req.user, sentiment_on: sanitize(req.body.sentiment_on)})
        sentiment_on.sentiment_count -= 1
        await sentiment_on.save()
        res.status(200).send({message: 'sentiment removed'})
    }
    catch (err) {
        return res.status(500).send({message: err})
    }
}