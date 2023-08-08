import { gql } from "apollo-boost";
// @ts-ignore
export const TOGGLE_DRIVING = gql`
  mutation toggleDriving {
    ToggleDrivingMode {
      ok
      error
    }
  }
`;
