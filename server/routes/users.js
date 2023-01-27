import express from "express";
import { 
    getUser, 
    getUserFriends, 
    getUsersButYou, 
    addRemoveFriend 
} from "../controllers/users.js";

const router = express.Router();

// READ
router.route('/:userId').get(getUser);
router.route('/friends/:userId').get(getUserFriends);
router.route('/notyou/:userId').get(getUsersButYou);

// PATCH
router.route('/:userId/:friendId').patch(addRemoveFriend);

export default router;