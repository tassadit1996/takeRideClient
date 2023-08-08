import { gql } from "apollo-boost";
// @ts-ignore
export const LOG_USER_IN = gql`
  mutation logUserIn($token: String!) {
    logUserIn(token: $token) @client
  }
`;
// @ts-ignore

export const LOG_USER_OUT = gql`
  mutation logUserOut {
    logUserOut @client
  }
`;