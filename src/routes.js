/*!

=========================================================
* Material Dashboard React - v1.10.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import GroupIcon from '@material-ui/icons/Group';
import TwoWheelerIcon from '@material-ui/icons/TwoWheeler';
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import Riders from "views/Riders/Riders.js";
import Shops from "views/Shops/Shops.js";
import Earnings from "views/Earnings/Earnings.js";
import ListedItems from "views/ListedItems/ListedItems.js";
import Customers from "views/Customers/Customers.js";
import TableList from "views/TableList/TableList.js";
import Typography from "views/Typography/Typography.js";
import Icons from "views/Icons/Icons.js";
import Maps from "views/Maps/Maps.js";
import NotificationsPage from "views/Notifications/Notifications.js";
import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.js";
// core components/views for RTL layout
import RTLPage from "views/RTLPage/RTLPage.js";

const dashboardRoutes = [
  
  {
    path: "/riders",
    name: "Riders",
    icon: TwoWheelerIcon,
    component: Riders,
    layout: "/admin",
  },
  {
    path: "/shops",
    name: "Shops",
    icon: LibraryBooks,
    component: Shops,
    layout: "/admin",
  },
  {
    path: "/promocode",
    name: "Promo Codes",
    icon: GroupIcon,
    component: Customers,
    layout: "/admin",
  },
  {
    path: "/earnings",
    name: "Earnings",
    icon: AttachMoneyIcon,
    component: Earnings,
    layout: "/admin",
  },

  {
    path: "/listeditems",
    name: "Listed Items",
    icon: BubbleChart,
    component: ListedItems,
    layout: "/admin",
  },
];

export default dashboardRoutes;
