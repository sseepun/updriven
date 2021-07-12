export class StatusPost {
    constructor(
        hasNext,
        hasPrevious,
        next,
        previous) {
        this.hasNext = hasNext
        this.hasPrevious = hasPrevious
        this.nextID = next
        this.previousID = previous
    }
}

export function changeStructurePost(posts) {
    let temp_array = []
    for(let i = 0; i < posts.length; i++){
        const temp_data = posts[i];

        if (temp_data['user'].length <= 0) {
            continue;
        }
        
        temp_array.push({
            id: temp_data['_id'],
            image: temp_data['media'],
            title: temp_data['subject'],
            desc: temp_data['content'],
            createdAt: temp_data['createdAt'],
            user: {
                id: temp_data['user'][0]['_id'],
                firstname: temp_data['user'][0]['user_detail'][0]['firstname'],
                lastname: temp_data['user'][0]['user_detail'][0]['lastname'],
                avatar: temp_data['user'][0]['_id'],
            },
            counts: {
                likes: temp_data['sentiment_count'],
                comments: temp_data['comment_count'],
            },
            actions: {
                shared: false,
                liked: temp_data['is_sentiment'],
                followed: false,
            },
            comments: []
        })
    }

    return temp_array;
}

export function changeStructureComment(objectComments) {
    const commentKeys = Object.keys(objectComments)

    let comments = []
    for(let i = 0; i < commentKeys.length; i++){
        const comment = objectComments[commentKeys[i]];
        const childKeys = Object.keys(comment['children'])

        comments.push({
            id: comment['_id'],
            comment: comment['comment'],
            createdAt: comment['createdAt'],
            user: {
                id: comment['author']['id'],
                firstname: 'tata',
                lastname: 'zakup',
                avatar: '/assets/img/profile/01.jpg'
            },
            counts: {
                likes: comment['sentiment_count']
            },
            actions: {
                liked: false
            },
            depth: comment['depth'],
            children: ( childKeys.length > 0? changeStructureComment(comment['children']) : {} )
        })
    }
    // console.log(comments)
    return comments;
}

export class _create {
    constructor(subject = '', content = '', category = '', PVmedia = [], fileMedia = [], visible_to = '1') {
      this.subject = subject;
      this.content = content;
      this.category = category;
      this.PVmedia = PVmedia;
      this.fileMedia = fileMedia;
      this.visible_to = visible_to;
    }
}

export class _CommentPost {
    constructor(postID = '') {
        this.postID = postID;
        this.parentCommentID = ''
        this.comment = '';
    }
}