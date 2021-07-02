const db = require("../models");
const sanitize = require('mongo-sanitize');
const Post = db.post;
const Category = db.category;
const Comment = db.comment;
const Sentiment = db.sentiment;

exports.getComments = async (req, res) => {
    try {
        const comments = await Comment.find({post_id: sanitize(req.body.post_id)}).sort({posted_date: 1}).lean()
        let rec = (comment, threads) => {
            let value;
            for (const thread in threads) {
                value = threads[thread];

                if (thread.toString() === comment.parent_comment.toString()) {
                    value.children[comment._id] = comment;
                    return;
                }

                if (value.children) {
                    rec(comment, value.children)
                }
            }
        }
        let threads = {}, comment
        for (let i=0; i<comments.length; i++) {
            comment = comments[i]
            comment['children'] = {}
            let parent_comment = comment.parent_comment
            if (!parent_comment) {
                threads[comment._id] = comment
                continue
            }
            rec(comment, threads)
        }
        res.status(200).send({
            'count': comments.length,
            'comments': threads
        })
    }
    catch (err) {
        console.log(err)
        return res.status(500).send({message: err})
    }
}

exports.getPosts = async (req, res) => {
    try {
        const post_list = await Post.paginate({
            limit: 1000,
            next: req.body.next,
            previous: req.body.previous,
            paginatedField: 'Orderable'
        })
        await Post.populate(post_list,
            [
                {path: 'results.user', model: 'User', select: 'user_detail', populate: {path: 'user_detail', select:['firstname', 'lastname']}}, 
                {path: 'results.category', model: 'Category', select: 'category_name'},
                {
                    path: 'results.share', 
                    model: 'Share', 
                    select:['user', 'post'], 
                    populate: {path: 'post', populate: {path: 'user', select: 'user_detail', populate:{path: 'user_detail', select:['firstname', 'lastname']}}}}
            ])
        res.status(200).send(post_list)
    }
    catch (err) {
        return res.status(500).send({message: err})
    }
}

exports.getSentiments = async (req, res) => {
    try {
        let sentiment_on;
        if (req.body.post_id) {
            sentiment_on = await Post.findById(sanitize(req.body.post_id))
        }
        else if (req.body.comment_id) {
            sentiment_on = await Comment.findById(sanitize(req.body.comment_id))
        }
        if (sentiment_on === null) {
            return res.status(200).send({
                "results": [],
                "hasPrevious": false,
                "hasNext": false
            })
        }
        const sentiment_list = await Sentiment.paginate({
            query: {
                sentiment: sentiment_on._id,
                sentiment_type: parseInt(req.body.sentiment_type) || {$in: [1, 2, 3, 4, 5]}
            },
            limit: 10,
            next: req.body.next,
            previous: req.body.previous,
            paginatedField: 'Orderable'
        })
        await Sentiment.populate(sentiment_list,
            [
                {path: 'results.user', model: 'User', select: 'user_detail', populate: 'user_detail'},
            ])
        res.status(200).send(sentiment_list)
    }
    catch (err) {
        console.log(err)
        return res.status(500).send({message: err})
    }
}