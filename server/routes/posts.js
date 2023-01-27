import express from 'express';
import { getFeedPosts, getUserPosts, likePost, deletePost } from '../controllers/posts.js';

const router = express.Router();

/* READ */
router.route('/').get(getFeedPosts);
router.route('/:userId').get(getUserPosts);

/* PATCH */
router.route('/:postId/like').patch(likePost);

/* DELETE */
router.route("/:postId/delete").delete(deletePost);

export default router;