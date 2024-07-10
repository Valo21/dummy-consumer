import axios from "axios"
import { useEffect, useState } from "react";
import Post, { IPost } from "../components/Post";

const API_URL: string = 'https://dummyjson.com';

function PostsList({ posts }: { posts: IPost[] }) {
    return (
        <div className='space-y-4'>
            {posts.map((post) => <Post data={post} />)}
        </div>
    )
}

interface SearchBarProps {
    onSubmit: (params: string) => void
}

function SearchBar({ onSubmit }: SearchBarProps) {
    const [input, setInput] = useState<string>('');

    return (
        <div className='m-2 flex bg-sky-900/80 overflow-hidden rounded-md'>
            <input
                className='flex-1 px-2 bg-transparent'
                onKeyDown={(e) => e.key === 'Enter' ? onSubmit(input) : null}
                value={input} onChange={(e) => setInput(e.target.value)}
                placeholder='Type a title...'
            />
            <button
                onClick={() => onSubmit(input)}
            >
                Search
            </button>
        </div>
    )
}

export default function PostsPage() {

    const [posts, setPosts] = useState<IPost[]>([]);

    async function getPosts() {
        const res = await axios.get(API_URL + '/posts');
        setPosts(res.data.posts);
    }

    async function searchPost(params: string) {
        const res = await axios.get(API_URL + '/posts/search?q=' + params);
        setPosts(res.data.posts);
    }

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <div className='flex-1 space-y-4'>
            <SearchBar onSubmit={searchPost}/>
            <PostsList posts={posts}/>
        </div>
    )
}
