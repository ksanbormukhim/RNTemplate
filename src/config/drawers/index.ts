import landingDrawer from './landingDrawer';

export const drawerConfig = {
  landingDrawer: landingDrawer,
};

export type DrawerConfigKey = keyof typeof drawerConfig;
