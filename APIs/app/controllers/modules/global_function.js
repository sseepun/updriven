const db = require("../../models");
const User = db.user;
const Post = db.post;
const Sentiment = db.sentiment;
const Media = db.media
const Category = db.category;

async function getPost(req, userId) {
    let post_list;
    if (req.body.category) {
        const category = await Category.findOne({ category_name : req.body.category })
        if (userId) {
            post_list = await Post.paginate({
                query: {
                    category: category._id,
                    user: userId._id
                },
                limit: 5,
                next: req.body.next,
                previous: req.body.previous,
                paginatedField: 'Orderable'
            })
        }
        else if (req.body.search) {
            post_list = await Post.paginate({
                query: {
                    category: category._id,
                    $or: [
                        {
                            content: { "$regex": req.body.search, "$options": "i" }
                        },
                        {
                            subject: { "$regex": req.body.search, "$options": "i" }
                        }
                    ]
                },
                limit: 5,
                next: req.body.next,
                previous: req.body.previous,
                paginatedField: 'Orderable'
            })
        }
        else {
            post_list = await Post.paginate({
                query: {
                    category: category._id
                },
                limit: 5,
                next: req.body.next,
                previous: req.body.previous,
                paginatedField: 'Orderable'
            })
        }
    }
    else {
        if (userId) {
            post_list = await Post.paginate({
                query: {
                    user: userId._id
                },
                limit: 5,
                next: req.body.next,
                previous: req.body.previous,
                paginatedField: 'Orderable'
            })
        }
        else if (req.body.search) {
            post_list = await Post.paginate({
                query: {
                    $or: [
                        {
                            content: { "$regex": req.body.search, "$options": "i" }
                        },
                        {
                            subject: { "$regex": req.body.search, "$options": "i" }
                        }
                    ]
                },
                limit: 5,
                next: req.body.next,
                previous: req.body.previous,
                paginatedField: 'Orderable'
            })
        }
        else {
            post_list = await Post.paginate({
                limit: 5,
                next: req.body.next,
                previous: req.body.previous,
                paginatedField: 'Orderable'
            })
        }
    }
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
                path: 'results.media', 
                model: 'Media',
                select: ['index', 'type', 'path'] 
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
    return post_list
}

async function getImage(req, userId) {
    const image_list = await Media.paginate({
        query: {
            user: userId._id,
            type: 'image/jpeg'
        },
        limit: 20,
        next: req.body.next,
        previous: req.body.previous,
        paginatedField: 'Orderable'
    })
    return image_list
}

module.exports = {
    getPost: getPost,
    getImage: getImage
}