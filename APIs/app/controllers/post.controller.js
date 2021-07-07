const db = require("../models");
const sanitize = require('mongo-sanitize');
const User = db.user;
const Post = db.post;
const Category = db.category;
const Comment = db.comment;
const Sentiment = db.sentiment;
const Share = db.share;

exports.createPost = async (req, res) => {
    try {
        console.log(req.files)
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
                post.media.push({index: index, type: item.mimetype, path: item.path });
            });
        }
        const category = await Category.findOne({ category_name: sanitize(req.body.category)} );
        post.category = category;
        await post.save()
        await Post.populate(post,
            [
                {path: 'user', model: 'User', select: 'user_detail', populate: {path: 'user_detail', select:['firstname', 'lastname']}}, 
                {path: 'category', model: 'Category', select: 'category_name'}
            ])
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
            await Post.deleteOne( {_id: sanitize(req.body.post_id) })
            await Comment.deleteMany( { post_id: sanitize(req.body.post_id) })
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
        const post = await Post.findById(sanitize(req.body.post_id))
        const share_post = await new Share({
            user: req.userId,
            post: post._id
        }).save()
        await  new Post({
            user: req.userId,
            share: share_post,
            status: true,
        }).save();
        await Share.populate(share_post, {path: 'post'})
        res.status(200).send(share_post);
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
                name: req.user.email
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

exports.sentiment = async (req, res) => {
    try {
        if (req.body.post_id && req.body.comment_id) {
            res.status(500).send({message: "cannot sentiment on post and comment at the same time"})
        }
        else if (req.body.post_id) {
            const post = await Post.findById(sanitize(req.body.post_id))
            post.sentiment_count = post.sentiment_count + 1;
            await post.save();
            const sentiment = new Sentiment({
                user: req.userId,
                sentiment: post,
                sentiment_on: 'Post',
                sentiment_type: req.body.sentiment_type
            });
            await sentiment.save();
            res.status(200).send({message: "give sentiment on post successfully"})
        }
        else if (req.body.comment_id) {
            let comment = await Comment.findById(sanitize(req.body.comment_id))
            comment.sentiment_count = comment.sentiment_count + 1;
            await comment.save();
            const sentiment = new Sentiment({
                user: req.userId,
                sentiment: comment,
                sentiment_on: 'Comment',
                sentiment_type: req.body.sentiment_type
            });
            await sentiment.save();
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