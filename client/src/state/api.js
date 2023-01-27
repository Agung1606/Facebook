import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL}),
    reducerPath: "facebookApi",
    tagTypes: ["Posts", "UserPosts"],
    // prepareHeaders is used to configure the header of every request and gives access to getState which we use to include the token from the store
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token;
        if(token) {
            // include token in req headers
            headers.set("authorization", `Bearer ${token}`)
            return headers;
        }
    },
    endpoints: (build) => ({
        getPosts: build.query({
            query: () => ({
                url: "api/v1/posts",
                method: "GET",
            }),
            providesTags: ["Posts"],
        }),
        getUsersPosts: build.query({
            query: ({ userId }) => ({
                url: `api/v1/posts/${userId}`,
                method: "GET",
                params: {userId},
            }),
            providesTags: ["UserPosts"],
        }),
    })
});

export const {
    useGetPostsQuery,
    useGetUsersPostsQuery,
} = api;