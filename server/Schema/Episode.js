import mongoose, { Schema } from "mongoose";

const episodeSchema = mongoose.Schema({

    episode_id: {
        type: String,
        required: true,
        unique: true,
    },
    episode_title: {
        type: String,
        required: true,
    },
    episode_banner: {
        type: String,
    },
    description: {
        type: String,
        required: true
    },
    poster: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
}, 
{ 
    timestamps: {
        createdAt: 'publishedAt'
    } 
})

export default mongoose.model("episodes", episodeSchema);