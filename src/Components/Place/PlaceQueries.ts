import { gql } from "apollo-boost";
// @ts-ignore
export const EDIT_PLACE = gql`
  mutation editPlace($placeId: Int!, $isFav: Boolean) {
    EditPlace(placeId: $placeId, isFav: $isFav) {
      ok
      error
    }
  }
`;
