import { DrawerScreenItemType } from '../../../types';

const landingDrawer: DrawerScreenItemType[] = [
  { name: 'Admin', icon: 'home', component: 'Landing' },
  { name: 'Screen 1', icon: 'medkit-outline', component: 'Screen1' },
  {
    name: 'Map Landing',
    icon: 'map',
    component: 'Map',
  },
  {
    name: 'Screens',
    icon: 'attach',
    children: [
      { name: 'Screen 1', icon: 'medkit-outline', component: 'Screen1' },
      { name: 'Screen 1', icon: 'medkit-outline', component: 'Screen2' },
      { name: 'Screen 3', icon: 'medkit-outline', component: 'Screen3' },
      { name: 'Screen 4', icon: 'medkit-outline', component: 'Screen4' },
    ],
  },
  // {
  //   name: 'The Screens',
  //   icon: 'attach',
  //   children: [
  //     { name: 'Screen 1', icon: 'medkit-outline', component: 'Screen1' },
  //     { name: 'Screen 2', icon: 'medkit-outline', component: 'Screen2' },
  //     { name: 'Screen 3', icon: 'medkit-outline', component: 'Screen3' },
  //     { name: 'Screen 4', icon: 'medkit-outline', component: 'Screen4' },
  //   ],
  // },
  // {
  //   name: 'The Screens 1',
  //   icon: 'attach',
  //   children: [
  //     {
  //       name: 'Screen 1',
  //       icon: 'medkit-outline',
  //       children: [
  //         { name: 'Screen 1', icon: 'medkit-outline', component: 'Screen1' },
  //         { name: 'Screen 2', icon: 'medkit-outline', component: 'Screen2' },
  //         { name: 'Screen 3', icon: 'medkit-outline', component: 'Screen3' },
  //         { name: 'Screen 4', icon: 'medkit-outline', component: 'Screen4' },
  //       ],
  //     },
  //     { name: 'Screen 2', icon: 'medkit-outline', component: 'Screen2' },
  //     { name: 'Screen 3', icon: 'medkit-outline', component: 'Screen3' },
  //     { name: 'Screen 4', icon: 'medkit-outline', component: 'Screen4' },
  //   ],
  // },

  // Add more entries as needed...
];
export default landingDrawer;
