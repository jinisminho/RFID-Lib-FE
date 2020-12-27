/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/Login/Login.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";
import RentingInf from "views/Librarian/RentingInfo.js";
import Book from "views/Book/index.js";
import BookCopy from "views/BookCopy/index.js";
import Checkout from "views/Checkout/index.js";
var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/librarian"
  },
  {
    path: "/book",
    name: "Books",
    icon: "ni ni-book-bookmark text-primary",
    component: Book,
    layout: "/librarian"
  },
  {
    path: "/copy",
    name: "Copy of book",
    icon: "ni ni-books text-primary",
    component: BookCopy,
    layout: "/librarian"
  },
  {
    path: "/checkout",
    name: "Check out books",
    icon: "fas fa-shopping-cart text-primary",
    component: Checkout,
    layout: "/librarian"
  },
  {
    path: "/renting",
    name: "Renting Information",
    icon: "ni ni-bullet-list-67 text-red",
    component: RentingInf,
    layout: "/librarian"
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "ni ni-planet text-blue",
    component: Icons,
    layout: "/librarian"
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "ni ni-pin-3 text-orange",
    component: Maps,
    layout: "/librarian"
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/librarian"
  },
  {
    path: "/tables",
    name: "Tables",
    icon: "ni ni-bullet-list-67 text-red",
    component: Tables,
    layout: "/librarian"
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth"
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth"
  }
];
export default routes;