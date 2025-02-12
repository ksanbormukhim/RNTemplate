import adinDrawer from './adinDrawer';
import landingDrawer from './landingDrawer';

export const drawerConfig = {
  landingDrawer: landingDrawer,
  adinDrawer:adinDrawer
};

export type DrawerConfigKey = keyof typeof drawerConfig;
