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
import Profil from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/Login/Login.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";
import BorrowingInf from "views/Student/BorrowingInfo.js";
import RequestNewBook from 'views/RequestNewBook/index.js'
import Book from "views/Student/Book/index"
import OldBook from "views/Student/Book"
import Profile from "views/Student/Profile.js"
import BookDetail from "views/Student/Book/BookDetail";

var routes = [
  // {
  //   path: "/index",
  //   name: "Dashboard",
  //   icon: "ni ni-tv-2 text-primary",
  //   component: Index,
  //   layout: "/patron"
  // },
  {
    path: "/index",
    name: "Books",
    icon: "ni ni-book-bookmark text-primary",
    component: Book,
    layout: "/patron",
    invisible:true
  },
  {
    path: "/book/detail",
    name: "Book Detail",
    icon: "ni ni-book-bookmark text-primary",
    component: BookDetail,
    layout: "/patron",
    invisible: true
  },
  {
    path: "/book",
    name: "Books",
    icon: "ni ni-book-bookmark text-primary",
    component: Book,
    layout: "/patron"
  },
  {
    path: "/checkoutInfo",
    name: "Checkout Information",
    icon: "ni ni-bullet-list-67 text-red",
    component: BorrowingInf,
    layout: "/patron"
  },
  {
    path: "/profile",
    name: "Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/patron",
    invisible: true
  },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "ni ni-planet text-blue",
  //   component: Icons,
  //   layout: "/patron"
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "ni ni-pin-3 text-orange",
  //   component: Maps,
  //   layout: "/patron"
  // },
  // {
  //   path: "/user-profile",
  //   name: "User Profile",
  //   icon: "ni ni-single-02 text-yellow",
  //   component: Profil,
  //   layout: "/patron"
  // },
  // {
  //   path: "/tables",
  //   name: "Tables",
  //   icon: "ni ni-bullet-list-67 text-red",
  //   component: Tables,
  //   layout: "/patron"
  // },
  // {
  //   path: "/requestNewBook",
  //   name: "Request New Book",
  //   icon: "ni ni-bullet-list-67 text-red",
  //   component: RequestNewBook,
  //   layout: "/patron"
  // },
  // {
  //   path: "/login",
  //   name: "Login",
  //   icon: "ni ni-key-25 text-info",
  //   component: Login,
  //   layout: "/auth"
  // },
  // {
  //   path: "/register",
  //   name: "Register",
  //   icon: "ni ni-circle-08 text-pink",
  //   component: Register,
  //   layout: "/auth"
  // }
];
export default routes;