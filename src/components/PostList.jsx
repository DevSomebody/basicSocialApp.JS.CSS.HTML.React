import {Link, useNavigate} from "react-router-dom";
import useStore from "h/useStore";
import {VscComment, VscEdit, VscTrash} from "react-icons/vsc";
import React from "react";
import {Protected} from 'c/Protected'

const PostItem = ({post, tab}) => {
    const removePost = useStore(({removePost}) => (removePost))
    const navigate = useNavigate()

    return (
        <Protected className='post-item'>
            <Link to={`/blog/post/${post.id}`}
                  onClick={(e)=>{
                      if(e.target.localName === 'button' || e.target.localName ==='svg'){
                          e.preventDefault()
                      }
                  }}
            >
                <h3>{post.title}</h3>
            </Link>
            {post.editable && (
                tab === 'my' ? (
                    <div>
                        <button
                            onClick={() => {
                                navigate(`/blog/post/${post.id}?edit=true`)
                            }}
                            className='info'
                        >
                            <VscEdit/>
                        </button>
                        <button
                            onClick={() => {
                                removePost(post.id)
                            }}
                            className='danger'
                        >
                            <VscTrash/>
                        </button>
                    </div>
                ):(
                    <div></div>
                )
            )}
            {tab === 'my' ? (<p></p>):(<p>Author: {post.author}</p>)}
            <p className='date'>{new Date(post.created_at).toLocaleString()}</p>
            {post.commentCount > 0 && (
                <p>
                    <VscComment />
                    <span className='badge'>
                        <sup>{post.commentCount}</sup>
                    </span>
                </p>
            )}
        </Protected>
    )
}

export const PostList = ({posts ,_tab}) => (
    <div className='post-list'>
        {posts.length === 0 ? (
            <h3>No posts </h3>
        ) : (
            posts.map((post) => <PostItem key={post.id} tab={_tab} post={post}/>)
        )}
    </div>
)