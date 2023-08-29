import postApi from 'a/post'
import {Form} from 'c/Form'
import {PostList} from 'c/PostList'
import {PostTabs} from 'c/PostTabs'
import {Protected} from 'c/Protected'
import useStore from 'h/useStore.js'
import {useEffect, useState} from 'react'

const fields = [
    {
        id: 'title',
        label: 'Title',
        type: 'text'
    },
    {
        id: 'content',
        label: 'Content',
        type: 'text'
    }
]

export const Blog = () =>{
    const {user,posts, setPosts, setNewData, allPostsWithCommentCount, postsByUser,getPostsByUser, setLoading, setError, fetchAllData} = useStore(
        ({ user,posts, setPosts, setNewData,  allPostsWithCommentCount, postsByUser,getPostsByUser, setLoading, setError, fetchAllData}) => ({
            user,
            posts,
            setPosts,
            allPostsWithCommentCount,
            postsByUser,
            setLoading,
            setError,
            getPostsByUser,
            setNewData,
            fetchAllData
        })
    )

    const [tab, setTab] = useState('all')
    const [_posts, setPosts_] = useState([])

    const create = (data) => {
        setLoading(true)
        postApi
            .create(data)
            .then(()=>{
                setTab('my')
            })
            .catch(setError)

        fetchAllData()
    }

    useEffect(() => {
        if(tab === 'new') return

        setNewData()
            .catch(setError)

        const _posts = tab === 'my' ? postsByUser[user.id] : allPostsWithCommentCount
        setPosts_(_posts)

    }, [tab, allPostsWithCommentCount])

    if (tab === 'new') {
        return (
            <Protected className='page new-post'>
                <h1>Blog</h1>
                <PostTabs tab={tab} setTab={setTab}/>
                <h2>New Post</h2>
                <Form fields={fields} submit={create} button='Create'/>
            </Protected>
        )
    }

    return (
        <div className='page blog'>
            <h1>Blog</h1>
            <PostTabs tab={tab} setTab={setTab}/>
            <h2>{tab === 'my' ? 'My' : 'All'} posts</h2>
            <PostList posts={_posts} _tab={tab}></PostList>
        </div>
    )
}