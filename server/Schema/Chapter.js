import mongoose, { Schema } from "mongoose";

const chapterSchema = mongoose.Schema({

    // chapter_info: {
        chapter_id: {
            type: String,
            required: true,
            unique: true,
        },
        chapter_title: {
            type: String,
            required: true,
        },
        chapter_status: {
            type: String,
            required: true,
            enum: ["finished", "unfinished"],
        },
        chapter_banner: {
            type: String,
        },
        content: {
            type: String,
            required: true
        },
        poster: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'users'
        },
        comments: {
            type: [Schema.Types.ObjectId],
            ref: 'comments'
        },
    // }
}, 
{ 
    timestamps: {
        createdAt: 'publishedAt'
    } 
})

export default mongoose.model("chapters", chapterSchema);