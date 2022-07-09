import { useState } from 'react';
import { useQuery, useLazyQuery, useMutation, gql } from '@apollo/client';
import { Base64 } from 'js-base64';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import client from '../../apollo-client-github';
import { CONFIG } from '../../config/env';
import Posts from '../posts';
import Search from '../search';
import Loader from '../loader';
import Error from '../error';

const GET_POSTS = gql`
  query GetPosts($username: String!) {
    user(username: $username) {
      username
      name
      tagline
      _id
      publication {
        posts {
          _id
          brief
          coverImage
          slug
          title
          contentMarkdown
          dateAdded
        }
      }
    }
  }
`;

const GET_OID = gql`
  query GetOID($repo: String!, $branch: String!, $owner: String!) {
    repository(name: $repo, owner: $owner) {
      object(expression: $branch) {
        oid
      }
    }
  }
`;
const CREATE_COMMIT = gql`
  mutation CreateCommitOnBranch(
    $oid: GitObjectID!
    $fileChanges: FileChanges!
    $branch: String!
    $repoWithOwner: String!
    $message: String!
  ) {
    createCommitOnBranch(
      input: {
        branch: { branchName: $branch, repositoryNameWithOwner: $repoWithOwner }
        message: { headline: $message }
        expectedHeadOid: $oid
        fileChanges: $fileChanges
      }
    ) {
      clientMutationId
    }
  }
`;

export default function App() {
  const [handleGetPosts, { data, loading, error }] = useLazyQuery(
    GET_POSTS,
    {
      notifyOnNetworkStatusChange: true,
    }
  );

  const { data: oidData, error: oidError, refetch } = useQuery(GET_OID, {
    variables: {
      repo: CONFIG.REPO_NAME,
      branch: CONFIG.BRANCH_NAME,
      owner: CONFIG.OWNER_NAME,
    },
    fetchPolicy: 'network-only',
    client,
  });

  const [handleCreateCommit, { data: res, error: mutError }] = useMutation(
    CREATE_COMMIT,
    {
      variables: {
        branch: CONFIG.BRANCH_NAME,
        repoWithOwner: CONFIG.REPO_WITH_OWNER,
        message: `Synced existing file post: temp commit`, // TODO: need to make it a scalable operation for millions of posts
      },
      client,
    }
  );

    //   console.log('oidData', oidData);
    //   console.log('oidError', oidError);

  const [username, setUsername] = useState('');
  const handleInput = (e) => {
    setUsername(e.target.value);
  };

  //   console.log('data', data);

  const { publication } = data?.user || {};

  const handleBackup = () => {
    const additions =
      publication?.posts?.map((post) => ({
        path: `temp/${post._id}-${post.slug}.md`,
        contents: Base64.encode(
          `## ${post.title} \n\n ${post.contentMarkdown}`
        ),
      })) ?? [];
    handleCreateCommit({
      variables: {
        oid: oidData.repository.object.oid,
        fileChanges: {
          additions: additions,
        },
      },
      onError: (d) => {
        console.log('error', d);
        toast('Could not backed up successfully!', {
          type: 'error',
          pauseOnHover: false,
          pauseOnFocusLoss: false,
        });
      },
      onCompleted: (d) => {
        toast('BackedUp successfully!', {
          type: 'success',
          pauseOnHover: false,
          pauseOnFocusLoss: false,
        });
        refetch();
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
              toast('No User Found with this username!', {
                type: 'error',
                pauseOnHover: false,
                pauseOnFocusLoss: false,
              });
            },
            onCompleted: (d) => {
              toast('Fetched successfully!', {
                type: 'success',
                pauseOnHover: false,
                pauseOnFocusLoss: false,
              });
            },
          })
        }
      />
      <button
        className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 disabled:bg-slate-500 mt-2 font-medium rounded-sm text-sm w-full sm:w-auto px-5 py-2.5 text-center'
        onClick={handleBackup}
        disabled={!publication?.posts?.length}
      >
        {' '}
        Backup{' '}
      </button>
      {publication?.posts?.length ? (
        <Posts posts={publication?.posts ?? []} author={data?.user?.name} />
      ) : null}
      {loading ? <Loader text='Searching for posts...' /> : null}
      {error ? <Error text='Unable to fetch the user' /> : null}
      <ToastContainer />
    </div>
  );
}
