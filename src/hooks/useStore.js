import { create } from 'zustand'
import dbApi from "a/db";
import postApi from "a/post";
import user from "a/user";

const useStore = create((set,get) => ({
    loading: true,
    setLoading:  (loading) => set({loading}),
    error: null,
    setError: (error) => set({loading: false, error}),
    user: null,
    setUser: (user) => set({user}),
    avatarUrl: null,
    setAvatarUrl: (avatarUrl) => set({avatarUrl}),

    users: [],
    posts: [],
    setPosts: (posts) => set({posts}),
    comments: [],

    postsById: {}, // объект постов по id
    postsByUser: {}, // объект постов по id пользователя
    userByPost: {}, // имя пользователя - id поста
    commentsByPost: {}, // объект комментариев по id поста
    allPostsWithCommentCount: [], // массив всех постов с авторами и количеством комментариев

    getCommentsByPost() {
        const {users, posts, comments} = get()
        const commentsByPost = posts.reduce((obj, post) => {
            obj[post.id] = comments
                .filter((comment) => comment.post_id === post.id)
                .map((comment) => ({
                    ...comment,
                    author: users.find((user) => user.id === comment.user_id).user_name
                }))
            return obj
        }, {})
        set({commentsByPost})
    },

    getUserByPost() {
        const {users, posts, user} = get()
        const userByPost = posts.reduce((obj, post) => {
          if(!user) return
          obj[post.id] = users.find((user) => user.id === post.user_id).user_name
          return obj
        }, {})
        set({ userByPost })
    },

    getPostsByUser() {
        const {users, posts, commentsByPost} = get()

        const postsByUser = users.reduce((obj, user) => {
            obj[user.id] = posts
                .filter((post) => post.user_id === user.id)
                .map((post) => ({
                    ...post,
                    editable: true,
                    commentCount: commentsByPost[post.id].length
                }))
            return obj
        }, {})

        set({ postsByUser })
    },

    getPostsById() {
        const {posts, user, userByPost, commentsByPost} = get()
        const postsById = posts.reduce((obj, post) => {
            if(!user) return
            obj[post.id] = {
                ...post,
                comments: commentsByPost[post.id],
                commentCount: commentsByPost[post.id].length
            }

            if(post.user_id === user?.id){
                obj[post.id].editable = true
            } else {
                obj[post.id].author = userByPost[post.id]
            }
            return obj
        }, {})
        set({postsById})
    },

    getAllPostsWithCommentCount(){
        const {posts, user, userByPost, commentsByPost} = get()
        if(!user) return
        const allPostsWithCommentCount = posts.map((post) => ({
            ...post,
            editable: user?.id === post.user_id,
            author: userByPost[post.id],
            commentCount: commentsByPost[post.id].length
        }))
        set({allPostsWithCommentCount})
    },

    async fetchAllData(){
        set({loading: true})

        const {
            getCommentsByPost,
            getUserByPost,
            getPostsByUser,
            getPostsById,
            getAllPostsWithCommentCount
        } = get()

        const {users, posts, comments} = await dbApi.fetchAllData()

        set({users, posts, comments})

        getCommentsByPost()
        getPostsByUser()
        getUserByPost()
        getPostsById()
        getAllPostsWithCommentCount()

        set({ loading: false})
    },

    async setNewData(){
        const {users, posts, comments} = await dbApi.fetchAllData()
        set({users, posts, comments})

        return posts
    },

    async removePost(id) {
        set({loading: true})
        postApi
            .remove(id)
            .then((result) => set({posts: result}))
            .catch((error) => set({error}))

        set({loading: false})
        window.location.reload()
    }
}))

export default useStore