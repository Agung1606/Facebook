import Post from "../models/Post.js";
import User from '../models/User.js'
import { StatusCodes } from 'http-status-codes';

/* CREATE */
export const createPost = async (req, res) => {
    try {
        const { userId, description, postPicturePath } = req.body;
        const user = await User.findById(userId);
        
        if(!user) res.status(StatusCodes.NOT_FOUND).json({message: " not found"});

        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            postDate: Date.now(),
            postPicturePath,
            userProfilePicturePath: user.profilePicturePath,
            description,
            likes: {},
            comments: {},
        });

    await newPost.save();

    const post = await Post.find().sort("-postDate");
    res.status(StatusCodes.OK).json(post);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message});
    }
};

/* READ */
export const getFeedPosts = async (req, res) => {
    try {
        const post = await Post.find({}).sort("-postDate");
        res.status(StatusCodes.OK).json(post);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message});
    }
};

export const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;
    
        const post = await Post.find({userId}).sort("-postDate");
        res.status(StatusCodes.OK).json(post);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message});
    }
};

/* PATCH */
export const likePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const { userId } = req.body;

        const post = await Post.findById(postId);
        const isLiked = post.likes.get(userId);

        if(!post) res.status(StatusCodes.NOT_FOUND).json({ message: "Not found"});

        if(isLiked) {
            post.likes.delete(userId);
        } else {
            post.likes.set(userId, true);
        }

        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { likes: post.likes },
            { new: true },
        );

        res.status(StatusCodes.OK).json(updatedPost);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message});
    }
};

/* DELETE */
export const deletePost = async (req, res) => {
    try {
        const { postId } = req.params;

        const post = await Post.findOneAndDelete({_id: postId});

        if(!post) {
            res.status(StatusCodes.NOT_FOUND).json({ message: "Not found"});
        }
        
        res.status(StatusCodes.OK).json(post);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message});
    }
};