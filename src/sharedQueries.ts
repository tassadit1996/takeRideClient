import { gql } from "apollo-boost";
// @ts-ignore
export const USER_PROFILE = gql`
  query userProfile {
    GetMyProfile {
      ok
      error
      user {
        profilePhoto
        firstname
        lastname
        email
        fullName
        isDriving
      }
    }
  }
`;
// @ts-ignore
export const GET_PLACES = gql`
  query getPlaces {
    GetMyPlaces {
      ok
      error
      places {
        id
        name
        address
        isFav
      }
    }
  }
`;