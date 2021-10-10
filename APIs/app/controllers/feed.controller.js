const global_functions = require("./modules/global_function");
const db = require("../models");
const sanitize = require('mongo-sanitize');
const User = db.user;
const Post = db.post;
const Category = db.category;
const Comment = db.comment;
const Sentiment = db.sentiment;

exports.getComments = async (req, res) => {
    try {
        let threads = {}, comment, comment_user = [], profile_image = []
        const comments = await Comment.find({ post_id: sanitize(req.body.post_id) }).sort({ posted_date: 1 }).lean()
        let rec = async (comment, threads) => {
            let value;
            for (const thread in threads) {
                value = threads[thread];

                if (thread.toString() === comment.parent_comment.toString()) {
                    value.children[comment._id] = comment;
                    comment_user.push(comment.author.id.toString())
                    const is_sentiment_comment = await Sentiment.findOne({ sentiment: comment, user: req.user })
                    if (is_sentiment_comment) {
                        value.children[comment._id].is_sentiment = true
                    }
                    else {
                        value.children[comment._id].is_sentiment = false
                    }
                    return;
                }

                if (value.children) {
                    rec(comment, value.children)
                }
            }
        }
        for (let i=0; i<comments.length; i++) {
            comment = comments[i]
            comment['children'] = {}
            let parent_comment = comment.parent_comment
            if (!parent_comment) {
                threads[comment._id] = comment
                comment_user.push(comment.author.id.toString())
                const is_sentiment_comment = await Sentiment.findOne({ sentiment: comment, user: req.user })
                if (is_sentiment_comment) {
                    threads[comment._id].is_sentiment = true
                }
                else {
                    threads[comment._id].is_sentiment = false
                }
                continue
            }
            rec(comment, threads)
        }
        const unique_user = Array.from(new Set(comment_user))
        for (let i = 0; i < unique_user.length; i++) {
            const user = await User.findById(unique_user[i]).select('user_detail').populate('user_detail')
            profile_image.push(
                { 
                    id: user._id, 
                    firstname: user.user_detail[0].firstname,
                    lastname: user.user_detail[0].lastname,
                    profile_pic: user.user_detail[0].profile_pic 
                }
            )
        }
        res.status(200).send(
            {
            'count': comments.length,
            'avatar': profile_image,
            'comments': threads
            }
        )
    }
    catch (err) {
        return res.status(500).send({message: err})
    }
}

exports.getPosts = async (req, res) => {
    try {
        let post_list = await global_functions.getPost(req)
        res.status(200).send(post_list)
    }
    catch (err) {
        return res.status(500).send({message: err})
    }
}

exports.getCategory = async (req, res) => {
    try {
        const category = await Category.find({})
        res.status(200).send(category)
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
        return res.status(500).send({message: err})
    }
}

exports.search = async (req, res) => {
    try {
        let post_list = await global_functions.getPost(req)
        return res.status(200).send(post_list)
    }
    catch (err) {
    console.log(err)
        return res.status(500).send({message: err})
    }
}