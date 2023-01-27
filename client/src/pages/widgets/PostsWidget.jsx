import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";

const PostsWidget = ({userId, isProfile=false}) => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts);
    const token = useSelector((state) => state.token);

    // Get all post in the database
    const getPosts = async () => {
        const response = await fetch(
            "http://localhost:7001/api/v1/posts", {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();

        dispatch(setPosts({ posts: data }));
    };

    // Just take all the posts based on user id
    const getUserPosts = async () => {
        const response = await fetch(
            `http://localhost:7001/api/v1/posts/${userId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();

        dispatch(setPosts({ posts: data })); 
    };

    useEffect(() => {
        if(isProfile) {
            getUserPosts();
            // dispatch(setPosts({ posts: dataUser })); 
        } else {
            getPosts();
            // dispatch(setPosts({ posts: data }));
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return(
        <>
            {posts.map(
                ({
                    _id,
                    userId,
                    firstName,
                    lastName,
                    postDate,
                    postPicturePath,
                    userProfilePicturePath,
                    description,
                    likes,
                    comments,
                }) => (
                    <PostWidget 
                        key={_id}
                        postId={_id}
                        postUserId={userId}
                        name={`${firstName} ${lastName}`}
                        postDate={postDate}
                        postPicturePath={postPicturePath}
                        userProfilePicturePath={userProfilePicturePath}
                        description={description}
                        likes={likes}
                        comments={comments}
                    />
                )
            )}
        </>
    );
};

export default PostsWidget;