import { useMutation } from '@apollo/client';
import { CREATE_COMMIT } from '../../graph-ql/mutations';
import client from '../../apollo-client-github';
import { CONFIG } from '../../config/env';

export default function CreateCommit() {
  const [handleCreateCommit, { data, error }] = useMutation(
    CREATE_COMMIT,
    {
      variables: {
        branch: CONFIG.BRANCH_NAME,
        repoWithOwner: CONFIG.REPO_WITH_OWNER,
        message: `Synced existing file post: temp commit`, // TODO: need to make it a scalable operation for millions of posts, introduce batching here
      },
      client,
    }
  );

  return [handleCreateCommit, { createCommitError: error } ]
}
