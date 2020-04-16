/*!

=========================================================
* Black Dashboard React v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import Icons from "views/Icons.js";
import TableList from "views/TrainedData/TableList.js";
import Typography from "views/Typography.js";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/data",
    name: "Trained Data",
    rtlName: "الرموز",
    icon: "tim-icons icon-bullet-list-67",
    component: TableList,
    layout: "/admin",
  },
  {
    path: "/analyzed",
    name: "Analyzed Data",
    rtlName: "خرائط",
    icon: "tim-icons icon-chart-bar-32",
    component: Icons,
    layout: "/admin",
  },
  {
    path: "/upload",
    name: "Upload Data",
    rtlName: "إخطارات",
    icon: "tim-icons icon-cloud-upload-94",
    component: Typography,
    layout: "/admin",
  },
  // {
  //   path: "/invoices/:name",
  //   name: "Invoice detail",
  //   rtlName: "إخطارات",
  //   icon: "tim-icons icon-cloud-upload-94",
  //   component: InvoiceDetail,
  //   layout: "/admin",
  // },
];
export default routes;
