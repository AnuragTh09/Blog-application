import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/database";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { Button, Container } from "../components";
import PostShimmer from '../components/shimmer/PostShimmer';
import sampleBlogImage from '../assets/blog_image.webp';

function PostPage() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const { status: authStatus, userData } = useSelector((state) => state.auth);
  const isAuthor = post && userData ? userData.$id === post.userId : false;

  useEffect(() => {
    if (slug) {
      appwriteService
        .getPost(slug)
        .then((post) => {
          if (post) setPost(post);
          else navigate("/");
        })
        .catch(error => {
          console.log("Appwrite Service :: getPost :: Post.jsx :: error :: ", error);
        });
    }
    else {
      navigate('/');
    }
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService
      .deletePost(post.$id)
      .then((status) => {
        if (status) {
          appwriteService
            .deleteFile(post.featuredImage)
            .catch(error => {
              console.log("Appwrite Service :: deleteFile :: Post.jsx :: error :: ", error);
            });
          navigate('/');
        }
      })
      .catch(error => {
        console.log("Appwrite Service :: deletePost :: Post.jsx :: error :: ", error);
      });
  };

  return post ? (
    <div className='py-8'>
      <Container>
        <div className='w-full flex justify-center mb-4 relative border rounded-xl p-2'>
          <img
            src={authStatus ? appwriteService.getFilePreview(post.featuredImage) : sampleBlogImage}
            alt={post.title}
            className='rounded-xl'
          />

          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>

        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">{post.title}</h1>
        </div>
        <div className="browser-css">
          {parse(post.content)}
        </div>
      </Container>
    </div>
  ) : <PostShimmer />;
}

export default PostPage;