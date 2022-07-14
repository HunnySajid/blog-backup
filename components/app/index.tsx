import { useState } from 'react';
import { Base64 } from 'js-base64';
import { CreateCommit, GetPosts, GetOid } from '../../graph-ql/api';
import Posts from '../posts';
import Search from '../search';
import Loader from '../loader';
import Error from '../error';
import Toast, { showToast } from '../toast';

export default function App() {
  const [handleGetPosts, { user, posts, isPostsLoading, getPostsError }] = GetPosts();

  const { oid, getOidError, refetchOid } = GetOid();

  const [handleCreateCommit] = CreateCommit();

  const [username, setUsername] = useState('');
  const handleInput = (e) => {
    setUsername(e.target.value);
  };

  const handleBackup = () => {
    const additions =
      posts?.map((post) => ({
        path: `temp/${post._id}-${post.slug}.md`,
        contents: Base64.encode(
          `## ${post.title} \n\n ${post.contentMarkdown}`
        ),
      })) ?? [];
    handleCreateCommit({
      variables: {
        oid: oid,
        fileChanges: {
          additions: additions,
        },
      },
      onError: () => {
        showToast({ message: 'Could not backed up successfully!', type: 'error'});
      },
      onCompleted: () => {
        showToast({ message: 'BackedUp successfully!', type: 'success'});
        refetchOid();
      },
    });
  };

  return (
    <div
      className={
        'mt-6 flex max-w-4xl flex-col items-center justify-center sm:w-full'
      }
    >
      <Search
        filter={username}
        handleInput={handleInput}
        onPressSearch={() =>
          handleGetPosts({
            variables: { username },
            onError: () => {
              setUsername('');
              showToast({ message: 'No User Found with this username!', type: 'error'});
            },
            onCompleted: (userData) => {
              if(!userData?.user?.publication?.posts?.length) {
                showToast({ message: 'No Posts found for this user!', type: 'warning'});
              } else {
                showToast({ message: 'Fetched successfully!', type: 'success'});
              }
              
            },
          })
        }
      />
      <button
        className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 disabled:bg-slate-500 mt-2 font-medium rounded-sm text-sm w-full sm:w-auto px-5 py-2.5 text-center'
        onClick={handleBackup}
        disabled={!posts?.length}
      >
        {' '}
        Backup{' '}
      </button>
      {posts?.length ? (
        <Posts posts={posts} author={user?.name} />
      ) : null}
      {isPostsLoading ? <Loader text='Searching for posts...' /> : null}
      {getPostsError ? <Error text='Unable to fetch the user' /> : null}
      <Toast />
    </div>
  );
}
