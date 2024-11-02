"use client";

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchPosts } from '@/redux/slices/postsSlice';

export default function PostsPage() {
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.posts.items);
  const postStatus = useAppSelector((state) => state.posts.status);

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts());
    }
  }, [dispatch, postStatus]);

  return (
    <div>
      <h1>Posts</h1>
      {postStatus === 'loading' && <p>Loading...</p>}
      {postStatus === 'succeeded' && (
        <ul>
          {posts.map((post: Post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      )}
      {postStatus === 'failed' && <p>Failed to load posts.</p>}
    </div>
  );
}
