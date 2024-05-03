import { useState, useEffect } from "react";
import { Container, PostForm } from "../components";
import appwriteService from "../appwrite/database";
import { useNavigate, useParams } from "react-router-dom";
import AddPostShimmer from "../components/shimmer/AddPostShimmer";

function EditPostPage() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (slug) {
            appwriteService
                .getPost(slug)
                .then((post) => {
                    if (post) {
                        setPost(post);
                    }
                })
                .catch(error => {
                    console.log("Appwrite Service :: getPost :: error :: ", error);
                })
        }
        else {
            navigate('/');
        }
    }, [slug, navigate]);

    return post ? (
        <div className="py-8">
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    ) : <AddPostShimmer/>;
}

export default EditPostPage;