import { gql } from "apollo-boost";
// @ts-ignore
export const VERIFY_PHONE = gql`
  mutation verifyPhone($key: String!, $phoneNumber: String!) {
    CompletePhoneVerification(key: $key, phoneNumber: $phoneNumber) {
      ok
      error
      token
    }
  }
`;
