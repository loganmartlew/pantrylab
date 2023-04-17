import { gql } from '@apollo/client';
import { atom } from 'jotai';
import { useEffect } from 'react';
import { apolloClient } from '~/lib/graphql/apolloClient';

export const inviteCountAtom = atom<number>(0);

export const useInviteCount = () => {
  useEffect(() => {
    apolloClient
      .query({
        query: gql`
          query GetHouseholds {
            households {
              name
            }
          }
        `,
      })
      .then(result => console.log(result));
  }, []);
};
