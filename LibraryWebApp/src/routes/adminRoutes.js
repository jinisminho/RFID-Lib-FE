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
import Book from "views/Book/index.js";
import RequestedBook from "views/RquestedBook/index.js";

var routes = [
    {
        path: "/index",
        name: "Dashboard",
        icon: "ni ni-tv-2 text-primary",
        component: Index,
        layout: "/admin"
    },
    {
        path: "/book",
        name: "Manage Book Titles",
        icon: "ni ni-books text-primary",
        component: Book,
        layout: "/admin"
    },
    {
        path: "/requests",
        name: "Requested books",
        icon: "ni ni-chat-round text-primary",
        component: RequestedBook,
        layout: "/admin"
    }
];
export default routes;