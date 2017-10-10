import React from "react";
import Assessment from "material-ui/svg-icons/action/assessment";
import PermIdentity from "material-ui/svg-icons/action/perm-identity";

const data = {
  menus: [
    { text: "DashBoard", icon: <Assessment />, link: "/dashboard" },
    { text: "Login Page", icon: <PermIdentity />, link: "/login" }
  ],
  tablePage: {
    items: [
      { id: 1, name: "Product 1", price: "$50.00", category: "Category 1" },
      { id: 2, name: "Product 2", price: "$150.00", category: "Category 2" },
      { id: 3, name: "Product 3", price: "$250.00", category: "Category 3" },
      { id: 4, name: "Product 4", price: "$70.00", category: "Category 4" },
      { id: 5, name: "Product 5", price: "$450.00", category: "Category 5" },
      { id: 6, name: "Product 6", price: "$950.00", category: "Category 6" },
      { id: 7, name: "Product 7", price: "$550.00", category: "Category 7" },
      { id: 8, name: "Product 8", price: "$750.00", category: "Category 8" }
    ]
  },
  dashBoardPage: {
    MyLists: [
      {
        id: 1,
        title: "MyTrips",
        text: "Past vacation saved trips."
      },
      { id: 2, title: "Build Trip", text: "Start building your trip" },
      {
        id: 3,
        title: "Wish Lists",
        text: "your future vacation lists"
      },
      {
        id: 4,
        title: "Photos Lists",
        text: "Saved photos from vacations "
      }
    ]
  }
};

export default data;
