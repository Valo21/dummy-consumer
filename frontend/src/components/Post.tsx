import axios from "axios";
import { useEffect, useState } from "react"

const API_URL: string = 'https://dummyjson.com';

export interface IPost {
    id: number
    title: string
    body: string
    tags: string[]
    reactions: {
        likes: number
        dislikes: number
    }
    views: number
    userId: number
}

export interface IComment {
    id: number
    body: string
    postId: number
    likes: number
    user: {
        id: number
        username: string
        fullName: string
    }
}

function CommentInput() {
    return (
        <div className='flex flex-col space-y-1 rounded-sm overflow-hidden'>
            <textarea placeholder='Say something...'/>
            <button className='w-fit'>Publish</button>
        </div>
    )
}

function Comment({ data }: { data: IComment}) {
    return (
        <div className='flex flex-col'>
            <h2 className='font-bold'>{data.user.fullName}</h2>
            <p>{data.body}</p>
            <p className='font-semibold cursor-pointer'>Reply</p>
        </div>
    )
}

function CommentSection({ comments }: { comments: IComment[] }) {

    return (
        <div className='space-y-4 p-2 bg-slate-800/60 rounded-sm'>
            <CommentInput/>
            {comments.map((comment) => <Comment data={comment} />)}
        </div>
    )
}

export default function Post({ data }: {data: IPost}) {
    const [comments, setComments] = useState<IComment[]>([]);

    async function getComments() {
        const res = await axios.get(API_URL + '/comments/post/' + data.id);
        setComments(res.data.comments);
    }

    return (
        <div className='min-w-96 p-4 space-y-4 bg-slate-700 rounded-sm'>
            <h2 className='font-bold'>{data.title}</h2>
            <p>{data.body}</p>
            <div className='space-x-2'>
                {data.tags.map((tag) => <span>#{tag}</span>)}
            </div>
            <div className='flex justify-between'>
                <div className='flex space-x-4'>
                    <div>
                        👍🏻{data.reactions.likes}
                    </div>
                    <div>
                        👎🏻{data.reactions.dislikes}
                    </div>
                </div>
                <div>
                    🙍🏻‍♂️{data.views}
                </div>
            </div>
            {
                comments.length > 0 ? 
                <CommentSection comments={comments}/>
                :
                <p className='w-fit font-semibold cursor-pointer' onClick={() => getComments()}>Comments...</p>
            }
        </div>
    )
}
