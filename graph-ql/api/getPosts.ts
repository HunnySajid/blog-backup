import { useLazyQuery } from '@apollo/client';
import { GET_POSTS } from '../queries';

export default function GetPosts() {
  const [handleGetPosts, { data, loading, error }] = useLazyQuery(GET_POSTS, {
    notifyOnNetworkStatusChange: true,
  });

  return [
    handleGetPosts,
    {
      user: data?.user,
      posts: data?.user?.publication?.posts ?? [],
      isPostsLoading: loading,
      getPostsError: error,
    },
  ];
}
