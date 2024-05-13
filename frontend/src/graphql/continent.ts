import { gql } from '@apollo/client';

export const queryContinents = gql`
  query Continents {
    items: continents {
      id
      name
    }
  }
`;
