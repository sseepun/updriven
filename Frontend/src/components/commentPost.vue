<template>
    
    <div v-for="(c, i) in comments" :key="i" class="comment mt-3">
        
        <div class="wrapper">
            <Avatar :avatar="c.user.avatar" />
            <div class="text">
                <div class="bg-fgray bradius-1 p-3">
                    <p class="sm fw-500 lh-xs">
                        {{c.user.firstname}} {{c.user.lastname}}
                    </p>
                    <p class="sm lh-xs ovf-hidden" v-html="c.comment"></p>
                </div>
                <p class="xs fw-400 color-gray mt-1">
                    {{formatDate(c.createdAt)}} 
                    <a 
                        class="color-gray fw-600 ml-3" :class="{ 'color-01': c.isSentiment }"
                        href="javascript:" @click="commentLikeToggle(c)"
                    >
                        Like
                        <span v-if="c.counts.likes">
                        {{c.counts.likes}}
                        </span>
                    </a> 
                    <a 
                        class="color-gray h-color-01 fw-600 ml-3" 
                        href="javascript:"
                        @click="_DisplayInputComment = true, _ReplyCommentID = c.id, _DepthComment = c.depth"
                    >
                        Reply
                    </a>
                </p>

                <commentPost v-if="c.children.length > 0" :comments="c.children"/>

            </div>
        </div>

    </div>

    <form @submit.prevent="replyComment()" v-if="_DisplayInputComment == true">
        <div class="comment mt-4">
            <div class="wrapper ai-center">
                <Avatar :avatar="user.avatar" />
                <FormGroup
                placeholder="Write a comment..." :required="true" 
                icon="send.png" wrapperClass="append fgray" 
                :value="comment" @input="(event) => comment = event" 
                />
            </div>
        </div>
    </form>

</template>

<script>
import moment from 'moment';
import {mapGetters, mapActions, mapMutations} from "vuex";
import { _CommentPost } from '../models/post';

export default {
    name: 'commentPost',
    props: {
        comments: { type: Array, default: [] },
    },
    data() {
        return {
            _DisplayInputComment: false,
            _ReplyCommentID: 0,
            _Comment: '',
            _DepthComment: 0,
            _PostID: this.comments[0].postID,
        }
    },
    computed: {
        ...mapGetters({
        user: 'authentication/user',
        })
    },
    methods: {
        ...mapActions({
            commentOrReply: 'post/commentOrReply',
            sentiment: 'post/sentiment',
            removeSentiment: 'post/rm_sentiment',
        }),

        commentLikeToggle(c) {
            if(c.isSentiment){
                c.isSentiment = false;
                c.counts.likes -= 1;
                this.removeSentiment({
                    sentiment_id: c.id,
                    sentiment_on: 'Comment'
                })
                .then( () => {
                /*c.actions.liked = false;
                c.counts.likes -= 1;*/
                },err => {
                c.isSentiment = true;
                c.counts.likes += 1;
                });
            }else{
                c.isSentiment = true;
                c.counts.likes += 1;
                this.sentiment({
                comment_id: c.id,
                sentiment_type: '1'
                }).then( () => {
                    /*c.actions.liked = true;
                    c.counts.likes += 1;*/
                },err => {
                    c.isSentiment = false;
                    c.counts.likes -= 1;
                });
            }
        },

        replyComment() {

            // this.selfPost.comments.push({
            //   comment: this.comment,
            //   createdAt: new Date(),
            //   user: this.user,
            //   counts: {
            //     likes: 0
            //   },
            //   actions: {
            //     liked: false
            //   }
            // });
            // this.comment = '';
            // this.commentLimit += 1;

            const commentObject = new _CommentPost(this._PostID);
            commentObject.comment = this.comment;
            commentObject.parentCommentID = this._ReplyCommentID;
            commentObject.depth = this._DepthComment;
            
            this.commentOrReply(commentObject).then( res => {
                this.comment = ''
            })
        },

        formatDate(value) {
            return moment(String(value)).format('MM/DD/YYYY');
        },
    },
}
</script>