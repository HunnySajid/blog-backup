import { useQuery } from '@apollo/client';
import { GET_OID } from '../../graph-ql/queries';
import client from '../../apollo-client-github';
import { CONFIG } from '../../config/env';

export default function GetOid() {
  const { data, loading, error, refetch } = useQuery(GET_OID, {
    variables: {
      repo: CONFIG.REPO_NAME,
      branch: CONFIG.BRANCH_NAME,
      owner: CONFIG.OWNER_NAME,
    },
    fetchPolicy: 'network-only',
    client,
  });

  return {
    oid: data?.repository?.object?.oid,
    isOidLoading: loading,
    getOidError: error,
    refetchOid: refetch
  }
}
