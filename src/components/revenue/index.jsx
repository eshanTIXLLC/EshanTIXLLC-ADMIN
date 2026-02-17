import React from "react";
import "../css/dashboard.css";
import Charts from "./Charts";
import SlabList from "./SlabList";

const RevenueContent = () => {
  return (
    <>
      <div className="content-body">
      
        <div className="container-fluid">
          <div className="row">
            <SlabList />
            <Charts />
          </div>
        </div>
      </div>
    </>
  );
};

export default RevenueContent;
