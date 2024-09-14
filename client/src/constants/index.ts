import { createCampaign, dashboard, logout, payment, profile, withdraw } from '../assets';

// Define the interface for a navigation link
interface NavLink {
  name: string;
  imgUrl: string;
  link: string;
  disabled?: boolean; // Optional property
}

// Use the interface to type the navlinks array
export const navlinks: NavLink[] = [
  {
    name: 'dashboard',
    imgUrl: dashboard,
    link: '/',
  },
  {
    name: 'campaign',
    imgUrl: createCampaign,
    link: '/create-campaign',
  },
  {
    name: 'payment',
    imgUrl: payment,
    link: '/',
    disabled: true,
  },
  {
    name: 'withdraw',
    imgUrl: withdraw,
    link: '/',
    disabled: true,
  },
  {
    name: 'profile',
    imgUrl: profile,
    link: '/profile',
  },
  {
    name: 'logout',
    imgUrl: logout,
    link: '/',
    disabled: true,
  },
];
