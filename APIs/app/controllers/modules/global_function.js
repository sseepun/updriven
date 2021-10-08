const db = require("../../models");
const User = db.user;
const Post = db.post;
const Sentiment = db.sentiment;
const Media = db.media

async function getPost(req, userId) {
    let user;
    if (userId) {
        user = await User.findById(userId)
        
    }
    else {
        user = await User.findById(req.userId)
    }
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
    let user;
    if (userId) {
        user = await User.findById(userId)
    }
    else {
        user = await User.findById(req.userId)
    }
    const image_list = await Media.paginate({
        query: {
            user: user._id,
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