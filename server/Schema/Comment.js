import mongoose, { Schema } from "mongoose";

const commentSchema = mongoose.Schema({
    
    novel_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'novels'
    },
    chapter_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'chapters'
    },
    novel_poster: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'novels',
    },
    comment: {
        type: String,
        required: true
    },
    children: {
        type: [ Schema.Types.ObjectId ],
        ref: 'comments'
    },
    commented_by: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: 'users'
    },
    isReply: {
        type: Boolean,
    },
    parent: {
        type: Schema.Types.ObjectId,
        ref: 'comments'
    }
},
{
    timestamps: {
        createdAt: 'commentedAt'
    }
})

export default mongoose.model("comments", commentSchema)