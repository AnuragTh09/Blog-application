/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import appwriteService from '../appwrite/database';
import { useSelector } from 'react-redux';
import sampleBlogImage from '../assets/blog_image.webp';

function PostCard({ $id, title, featuredImage }) {
    const { status: authStatus } = useSelector((state) => state.auth);

    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full bg-gray-100 rounded-xl p-4'>
                <div className='w-full flex justify-center mb-2'>
                    <img src={authStatus ? appwriteService.getFilePreview(featuredImage) : sampleBlogImage} alt={title} className='rounded-xl w-full h-44 object-cover' />
                </div>
                <h2 className='text-xl font-bold text-justify w-max mx-auto'>{title}</h2>
            </div>
        </Link>
    )
}

export default PostCard;