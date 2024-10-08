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

type DrawerScreenItemType = { name: string; icon: string; hide?: boolean } & (
  | {
      component: string;
      initialChildComponent?: string;
    }
  | {
      children: DrawerScreenItemType[];
    }
);

type MyDrawerProp = {
  labelStyle?: StyleProp<TextStyle>;
  allowFontScaling?: boolean;
  activeTintColor?: string;
  inactiveTintColor?: any;
  activeBackgroundColor?: any;
  inactiveBackgroundColor?: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
  accessibilityLabel?: string;
};

type TabScreenItemType = {
  name: string;
  icon: string;
  component: string;
  hide?: boolean;
};

type a = Omit<TabScreenItemType, 'name' | 'hide' | 'component'>;
