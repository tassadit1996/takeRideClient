import { gql } from "apollo-boost";
// @ts-ignore
export const UPDATE_PROFILE = gql`
  mutation updateProfile(
    $firstname: String!
    $lastname: String!
    $profilePhoto: String!
  ) {
    UpdateProfile(
      firstname: $firstname
      lastname: $lastname
      profilePhoto: $profilePhoto
    ) {
      ok
      error
    }
  }
`;
