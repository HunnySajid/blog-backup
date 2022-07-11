import { gql } from '@apollo/client';

export const CREATE_COMMIT = gql`
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