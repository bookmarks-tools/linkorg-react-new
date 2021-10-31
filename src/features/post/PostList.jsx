import { Post } from './Post';

export const PostList = ({ posts, onDelete }) => {
  return (
    <>
      {posts.map((post) => (
        <div className="mb-10">
          <Post key={post.id} post={post} onDelete={() => onDelete(post.id)} />
        </div>
      ))}
    </>
  );
};
