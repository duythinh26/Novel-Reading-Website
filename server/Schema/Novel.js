import mongoose, { Schema } from "mongoose";

const novelSchema = mongoose.Schema({

    novel_id: {
        type: String,
        required: true,
        unique: true,
    },
    novel_title: {
        type: String,
        required: true,
    },
    other_name: {
        type: String
    },
    sensitive_content: {
        type: Boolean,
        required: false,
        default: false,
    },
    novel_banner: {
        type: String,
        // required: true,
    },
    author: {
        type: [Schema.Types.ObjectId],
        required: true,
    },
    artist: {
        type: [Schema.Types.ObjectId],
    },
    type_of_novel: {
        type: String,
        enum: ["translate", "original", "converted"],
        required: true,
    },
    categories: {
        type: [String],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    note: {
        type: String,
    },
    status: {
        type: String,
        enum: ["ongoing", "pause", "finished"],
        required: true,
    },
    episode: {
        type: [Schema.Types.ObjectId],
        // required: true,
        ref: 'episodes',
    },
    poster: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    activity: {
        total_likes: {
            type: Number,
            default: 0
        },
        total_comments: {
            type: Number,
            default: 0
        },
        total_reads: {
            type: Number,
            default: 0
        },
        total_parent_comments: {
            type: Number,
            default: 0
        },
    },
    comments: {
        type: [Schema.Types.ObjectId],
        ref: 'comments'
    },
    draft: {
        type: Boolean,
        default: false
    },
    permission: {
        type: Boolean,
        default: false,
    }
}, 
{ 
    timestamps: {
        createdAt: 'publishedAt'
    } 
})

export default mongoose.model("novels", novelSchema);