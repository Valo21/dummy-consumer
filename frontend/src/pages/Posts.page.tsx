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

export default function PostsPage() {

    const [posts, setPosts] = useState<IPost[]>([]);

    async function getPosts() {
        const res = await axios.get(API_URL + '/posts');
        setPosts(res.data.posts);
    }

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <div>
            <PostsList posts={posts}/>
        </div>
    )
}
