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
import BorrowingInf from "views/Student/BorrowingInfo.js";
import Book from "views/Student/Book/index"
import Profile from "views/Student/Profile.js"
import BookDetail from "views/Student/Book/BookDetail";
import ChangePassword from "views/ChangePassword/index";
import SearchBook from "views/SearchBook/index.js";

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
    path: "/searchbook",
    name: "Search Book",
    icon: "ni ni-book-bookmark text-primary",
    component: SearchBook,
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
  {
    path: "/changepw",
    name: "Change Password",
    icon: "fa fa-book-reader text-red",
    component: ChangePassword,
    layout: "/patron",
    invisible: true
  }
];
export default routes;