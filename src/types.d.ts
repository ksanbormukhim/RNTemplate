type UserDataType = {
  userid: string;
  district: string;
  password: string;
  uid: string;
  status: string;
  role: string;
};

type LocationDataType = {
  latitude: number;
  longitude: number;
  altitude: number | null;
  accuracy: number;
  altitudeAccuracy: number | null;
  heading: number | null;
  speed: number | null;
};
