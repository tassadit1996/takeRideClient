import { gql } from "apollo-boost";
// @ts-ignore
export const FACEBOOK_CONNECT = gql`
  mutation facebookConnect(
    $firstname: String!
    $lastname: String!
    $email: String
    $fbId: String!
  ) {
    FacebookConnect(
      firstname: $firstname
      lastname: $lastname
      email: $email
      fbId: $fbId
    ) {
      ok
      error
      token
    }
  }
`;
