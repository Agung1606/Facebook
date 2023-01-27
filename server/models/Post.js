import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
        min: 2,
        max: 50,
    },
    lastName: {
        type: String,
        required: true,
        min: 2,
        max: 50,
    },
    postDate: Date,
    postPicturePath: String,
    userProfilePicturePath: String,
    description: String,
    likes: {
        type: Map,
        of: Boolean,
    },
    comments: {
        type: Map,
        of: Array,
    }
});

const Post = mongoose.model('Post', PostSchema);
export default Post;