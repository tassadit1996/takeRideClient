import { gql } from "apollo-boost";
// @ts-ignore
export const REPORT_LOCATION = gql`
  mutation reportMovement($lat: Float!, $lng: Float!) {
    ReportMovement(lastLat: $lat, lastLng: $lng) {
      ok
    }
  }
`;
// @ts-ignore

export const GET_NEARBY_DRIVERS = gql`
  query getDrivers {
    GetNearbyDrivers {
      ok
      drivers {
        id
        lastLat
        lastLng
      }
    }
  }
`;
// @ts-ignore

export const REQUEST_RIDE = gql`
  mutation requestRide(
    $pickUpAddress: String!
    $pickUpLat: Float!
    $pickUpLng: Float!
    $dropOffAddress: String!
    $dropOffLat: Float!
    $dropOffLng: Float!
    $price: Float!
    $distance: String!
    $duration: String!
  ) {
    RequestRide(
      pickUpAddress: $pickUpAddress
      pickUpLat: $pickUpLat
      pickUpLng: $pickUpLng
      dropOffAddress: $dropOffAddress
      dropOffLat: $dropOffLat
      dropOffLng: $dropOffLng
      price: $price
      distance: $distance
      duration: $duration
    ) {
      ok
      error
      ride {
        id
      }
    }
  }
`;
// @ts-ignore

export const GET_NEARBY_RIDE = gql`
  query getRides {
    GetNearbyRide {
      ok
      error
      ride {
        id
        pickUpAddress
        dropOffAddress
        price
        distance
        passenger {
          fullName
          profilePhoto
        }
      }
    }
  }
`;
// @ts-ignore
export const ACCEPT_RIDE = gql`
  mutation acceptRide($rideId: Int!) {
    UpdateRideStatus(rideId: $rideId, status: ACCEPTED) {
      ok
      error
      rideId
    }
  }
`;
// @ts-ignore

export const SUBSCRIBE_NEARBY_RIDES = gql`
  subscription nearbyRides {
    NearbyRideSubscription {
      id
      pickUpAddress
      dropOffAddress
      price
      distance
      passenger {
        fullName
        profilePhoto
      }
    }
  }
`;