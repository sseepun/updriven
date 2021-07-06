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
        var temp_data = posts[i];

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
                liked: true,
                followed: true,
            },
            comments: []
        })

        // console.log(result)

        console.log(temp_array)
    }

    return temp_array;
}

export class _create {
    constructor(subject = '', content = '', category = '', media = null, visible_to = '1') {
      this.subject = subject;
      this.content = content;
      this.category = category;
      this.media = media;
      this.visible_to = visible_to;
    }
}