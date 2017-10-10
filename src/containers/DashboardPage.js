import React from "react";
import {} from "material-ui/styles/colors";
import MyLists from "../components/dashboard/MyLists";
import globalStyles from "../styles";
import Data from "../data";

const DashboardPage = () => {
  return (
    <div>
      <h3 style={globalStyles.navigation}>MyTrip / Dashboard</h3>

      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 m-b-15 ">
          <MyLists data={Data.dashBoardPage.MyLists} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
