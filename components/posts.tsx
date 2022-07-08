import { useQuery, useLazyQuery, useMutation, gql } from '@apollo/client';
import Search from './search';
import { useState } from 'react';
import client from '../apollo-client-github';
import { Base64 } from 'js-base64';

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

const OID_QUERY = gql`
  query {
    repository(name: "hashnode-backups", owner: "HunnySajid") {
      object(expression: "main") {
        oid
      }
    }
  }
`;
const COMMIT_MUTATION = gql`
  mutation CreateCommitOnBranch($oid: GitObjectID!, $contents: Base64String!) {
    createCommitOnBranch(
      input: {
        branch: {
          branchName: "main"
          repositoryNameWithOwner: "HunnySajid/hashnode-backups"
        }
        message: { headline: "Commit Message", body: "temp commit from client" }
        expectedHeadOid: $oid
        fileChanges: {
          additions: [{ path: "temp/README.txt", contents: $contents }]
        }
      }
    ) {
      clientMutationId
    }
  }
`;

export default function Posts() {
  const [getPosts, { data, loading, error }] = useLazyQuery(POSTS_QUERY, {
    notifyOnNetworkStatusChange: true,
  });

  const { data: oidData, error: oidError } = useQuery(OID_QUERY, {
    client,
  });

  const [onBackupClicked, { data: res, error: mutError }] =
    useMutation(COMMIT_MUTATION, {
      client
    });

  console.log('oidData', oidData);
  console.log('oidError', oidError);

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

  const { publication } = data?.user || {};

  const handleBackup = () => {
    onBackupClicked({
      variables: {
        oid: oidData.repository.object.oid,
        contents: Base64.encode(
          'If you have landed here chances are you already know about the node and want to figure out how you can use different versions across your projects. If you don\'t know [what is node](https://nodejs.org/en/), you can checkout another short article where I talk about it.\n\n> [What the heck is Node.js?](https://devpub.hashnode.dev/what-the-heck-is-node-js-12ae5639d22f).\n\nHere I will show a way to use a specific version of node within your project. A prerequisite for this is to install nvm package on your system that is used to manage multiple node versions.\n\n\n## Step - 1\n\nRun ```\nnode -v > .nvmrc\n```  on terminal\nThis will create a  ```\n.nvmrc\n```  file in the project directory. This file contains the node version to be used.  \n\n\n![Screenshot 2022-07-03 at 1.11.29 AM.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1656796204436/5JBmH02IX.png align="left")\n\nNow, whenever we run  ```\nnvm use\n```  in our project directory it will pick the node version listed in the  ```\n.nvmrc\n```  file. But we don’t want to run this command every time. Instead, we want **nvm** to automatically pick the node version whenever we are in this directory. \n\nFor that, we have to make changes to our terminal’s configuration file. \nI will cover **zsh** &  **bash**.\n\n\n## Step - 2\n\n### For ZSH\nIn the root directory of your system. There would be a ```\n.zprofile\n```  or  ```\n.zshrc\n```  file. This would be a hidden file, you can run ```\nls -a\n```  on the command line or ```\ncommand + shift + .\n``` on your Mac system. If there is not any you can create one.\n\nThere all you have to do is put this piece of code to let ZSH search for the .nvmrc file in the directory to pick the desired node version.\n\n```\n# place this after nvm initialization!\nautoload -U add-zsh-hook\nload-nvmrc() {\n  local node_version="$(nvm version)"\n  local nvmrc_path="$(nvm_find_nvmrc)"\n\n  if [ -n "$nvmrc_path" ]; then\n    local nvmrc_node_version=$(nvm version "$(cat "${nvmrc_path}")")\n\n    if [ "$nvmrc_node_version" = "N/A" ]; then\n      nvm install\n    elif [ "$nvmrc_node_version" != "$node_version" ]; then\n      nvm use\n    fi\n  elif [ "$node_version" != "$(nvm version default)" ]; then\n    echo "Reverting to nvm default version"\n    nvm use default\n  fi\n}\nadd-zsh-hook chpwd load-nvmrc\nload-nvmrc\n```\n\nYou can follow [this link](https://github.com/nvm-sh/nvm#zsh) to get the code.\n\n\n### For BASH\nIn the root directory of your system. There would be a ```\n.bash_profile\n```  or  ```\n.bashrc\n```  file. Again, this would be a hidden file, you can run  ```\nls -a\n``` on the command line or ```\ncommand + shift + .\n``` on your Mac system. If there is not any you can create one.\n\nThere all you have to do is put this piece of code to let BASH search for the ```\n.nvmrc\n``` file in the directory to pick the desired node version. \n\nYou can follow [this link](https://github.com/nvm-sh/nvm#bash) to get the code. \n\nRelevant stack overflow [answer](https://stackoverflow.com/questions/57110542/how-to-write-a-nvmrc-file-which-automatically-change-node-version)\n\n\n**Here is how it behaves\n**\n\n![abcd.gif](https://cdn.hashnode.com/res/hashnode/image/upload/v1656796580593/tt-Tu9el2.gif align="left")\n\n\n## Alternate Solution\nAs an alternative to the NVM, we can also use nodeenv to manage node versions in our project. \nFollowing is the link which shows how to do that.\nhttps://stackoverflow.com/a/61356070\n\nI hope you liked the content, if you have any suggestions for improvements do let me know! \n\n'
        ),
        // changes: {
        //   additions: [
        //     {
        //       path: 'temp/README.txt',
        //       contents: Base64.encode(
        //         'My initial backup triggered from app hehe feeling good 🙂 '
        //       ),
        //     },
        //   ],
        // },
      },
      onCompleted: (d) => {
        console.log('mutation res', d);
      },
    });
  };

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
      <button
        className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-sm text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        onClick={handleBackup}
      >
        {' '}
        Backup{' '}
      </button>
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
