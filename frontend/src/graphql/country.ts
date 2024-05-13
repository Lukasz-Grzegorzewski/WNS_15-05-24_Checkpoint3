import { gql } from '@apollo/client';

export const queryCountries = gql`
  query Countries {
    items: countries {
      id
      name
      emoji
      code
      continent {
        id
        name
      }
    }
  }
`;

export const queryCountry = gql`
  query Country($code: String!) {
  item: country(code: $code) {
    id
    code
    name
    emoji
    continent {
      id
      name
    }
  }
}
`;
export const addCountry = gql`
  mutation AddCountry($data: NewCountryInput!) {
    item: addCountry(data: $data) {
      id
      code
      name
      emoji
      continent {
        id
        name
      }
    }
  }
`;
