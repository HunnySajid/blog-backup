import { useLazyQuery, gql } from '@apollo/client';
import Search from './search';
import { useState } from 'react';

const POSTS_QUERY = gql`
  query Posts($username: String!) {
    user(username: $username) {
      username
      name
      tagline
      _id
      publication {
        posts {
          _id
          slug
          title
          contentMarkdown
          dateAdded
        }
      }
    }
  }
`;

export default function Posts() {
  const [getPosts, { data, loading, error }] = useLazyQuery(POSTS_QUERY, {
    notifyOnNetworkStatusChange: true,
  });

  const [username, setUsername] = useState('');
  const handleInput = (e) => {
    setUsername(e.target.value);
  };

  if (loading) {
    return (
      <h2>
        <a
          href='#loading'
          aria-hidden='true'
          className='aal_anchor'
          id='loading'
        >
          <svg
            aria-hidden='true'
            className='aal_svg'
            height='16'
            version='1.1'
            viewBox='0 0 16 16'
            width='16'
          >
            <path
              fillRule='evenodd'
              d='M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z'
            ></path>
          </svg>
        </a>
        Loading...
      </h2>
    );
  }

  if (error) {
    console.error(error);
    return null;
  }
  console.log('data', data);

  const { publication } = data?.user || {}; // data.countries.slice(0, 4);

  return (
    <div
      className={
        'mt-6 flex max-w-4xl flex-wrap items-center justify-around sm:w-full'
      }
    >
      <Search
        filter={username}
        handleInput={handleInput}
        onPressSearch={() => getPosts({ variables: { username } })}
      />
      {publication?.posts?.map((post) => (
        <div
          key={post._id}
          className={'mt-6 h-64 w-96 rounded-xl border p-6 text-left'}
        >
          <h3 className='text-2xl cursor-pointer font-bold hover:text-blue-600 focus:text-blue-600'>
            <a
              href='#country-name'
              aria-hidden='true'
              className='aal_anchor'
              id='post-title'
            >
              <svg
                aria-hidden='true'
                className='aal_svg'
                height='16'
                version='1.1'
                viewBox='0 0 16 16'
                width='16'
              >
                <path
                  fillRule='evenodd'
                  d='M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z'
                ></path>
              </svg>
            </a>
            {post.title}
          </h3>
          <p className='mt-4 text-xl'>{post.dateAdded}</p>
        </div>
      ))}
    </div>
  );
}
