import { gql } from "apollo-boost";
// @ts-ignore
export const IS_LOGGED_IN = gql`
  {
    auth {
      isLoggedIn @client
    }
  }
`;