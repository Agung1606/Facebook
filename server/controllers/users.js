import User from '../models/User.js';
import { StatusCodes } from 'http-status-codes';

/* READ */
export const getUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId).select("-password");

        if(!user) res.status(StatusCodes.NOT_FOUND).json({message: "User not found"});
        res.status(StatusCodes.OK).json(user);
        
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message});
    }
};

export const getUserFriends = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);

        if(!user) res.status(StatusCodes.NOT_FOUND).json({message: "User not found"});

        const friends = await Promise.all(
            user.friends.map((id) => {
                return User.findById(id);
            })
        );

        const formattedFriend = friends.map(
            ({_id, firstName, lastName, profilePicturePath}) => {
                return {_id, firstName, lastName, profilePicturePath};
            }
        );

        res.status(StatusCodes.OK).json(formattedFriend);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message});
    }
};

export const getUsersButYou = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);
        if(!user) res.status(StatusCodes.NOT_FOUND).json({ message: error.message });

        // take all user in the database except for the user's friends and the user itself
        const notFriends = await User.find({_id: {$ne: userId } });

        const formattedNotFriend = notFriends.map(
            ({_id, firstName, lastName, profilePicturePath}) => {
                return {_id, firstName, lastName, profilePicturePath};
            }
        );

        return res.status(StatusCodes.OK).json(formattedNotFriend);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

// PATCH
export const addRemoveFriend = async (req, res) => {
    try {
        const { userId, friendId } = req.params;

        const user = await User.findById(userId);
        const friend = await User.findById(friendId);

        if(!user || !friend) res.status(StatusCodes.NOT_FOUND).json({message: "User not found"});

        if(user.friends.includes(friendId)) {
            user.friends = user.friends.filter(id => id !== friendId);
            friend.friends = friend.friends.filter(id => id !== userId);
        } else {
            user.friends.push(friendId);
            friend.friends.push(userId);
        }

        await user.save();
        await friend.save();

        const friends = await Promise.all(
            user.friends.map(id => {
                return User.findById(id);
            })
        );

        const formattedFriend = friends.map(
            ({_id, firstName, lastName, birthday, gender, profilePicturePath}) => {
                return {_id, firstName, lastName, birthday, gender, profilePicturePath};
            }
        );

        res.status(StatusCodes.OK).json(formattedFriend);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message});
    }
}