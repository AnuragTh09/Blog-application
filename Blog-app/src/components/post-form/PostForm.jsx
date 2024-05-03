/* eslint-disable react/prop-types */
import { Button, Input, RTE, Select } from '../index';
import appwriteService from '../../appwrite/database';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import AddPostShimmer from '../shimmer/AddPostShimmer';

export default function PostForm({ post }) {
    const [showShimmer, setShowShimmer] = useState(true);
    const navigate = useNavigate();
    const userData = useSelector(state => state.auth.userData);
    const { register, handleSubmit, control, setValue, getValues, watch } = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.$id || '',
            content: post?.content || '',
            status: post?.status || 'active',

        }
    });

    const submit = async (data) => {
        console.log(data);
        // Update the Post
        if (post) {
            // Uploading the file(image) to DB
            const file = await appwriteService.uploadFile(data.image[0] ? data.image[0] : null);

            // Delete the file(image) from DB
            if (file) {
                await appwriteService.deleteFile(post.featuredImage);
            }

            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        }
        // Make new Post
        else {
            const file = await appwriteService.uploadFile(data.image[0] ? data.image[0] : null);

            data.featuredImage = file.$id;
            const dbPost = await appwriteService.createPost({
                ...data,
                userId: userData.$id
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        }
    };

    const slugTransform = React.useCallback((value) => {
        if (value && typeof value === 'string') {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s']+/g, "-")
                .replace(/\s/g, '-');
        }

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'title') {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });
        setShowShimmer(false);

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    if (showShimmer) {
        return <AddPostShimmer />
    }

    return (
        <form onSubmit={handleSubmit(submit)} className="flex sm:flex-row flex-col sm:items-start items-center flex-wrap">
            <div className="w-full sm:w-2/3 px-2">
                <Input
                    label="Title: "
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", {
                        required: true
                    })}
                />
                <Input
                    label="Slug: "
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", {
                        required: true
                    })}
                    onInput={(e) => setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true })}
                />
                <RTE label="Content: " name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className='w-full sm:w-1/3 px-2'>
                <Input
                    label='Featured Image: '
                    type='file'
                    className='mb-4'
                    accept='image/png, image/jpg, image/jpeg, image/gif'
                    {...register("image", {
                        required: !post
                    })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={['Active', 'Inactive']}
                    label="status"
                    className="mb-4"
                    {...register("status", {
                        required: true
                    })}
                />
                <Button type='submit' className='w-full p-2' bgColor={post ? "bg-green-500" : undefined}>
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}