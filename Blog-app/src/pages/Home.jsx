import { useState, useEffect } from 'react'
import appwriteService from "../appwrite/database";
import { Container, PostCard } from '../components';
import PostsShimmer from '../components/shimmer/PostsShimmer';
import AddPostMobileBtn from '../components/AddPostMobileBtn';

function HomePage() {
    const [posts, setPosts] = useState([]);
    const [showShimmer, setShowShimmer] = useState(true);

    useEffect(() => {
        appwriteService
            .getPosts([])
            .then((posts) => {
                if (posts) {
                    setPosts(posts.documents);
                }
            })
            .catch(error => {
                console.log("Appwrite Service :: getPosts :: Home.jsx :: ", error);
            })
            .finally(() => {
                setShowShimmer(false);
            });
    }, []);

    if(showShimmer) {
        return <PostsShimmer/>
    }

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-x-4 gap-y-4 w-full'>
                    {
                        (posts.length > 0) ?
                            posts.map(post => (
                                <div key={post.$id} className='p-2 w-auto'>
                                    <PostCard {...post} />
                                </div>
                            ))
                            :
                            <h1>No blogs found. Start writing your first blog post!</h1>
                    }
                </div>
                <AddPostMobileBtn />
            </Container>
        </div>
    )
}

export default HomePage;