import React, { useCallback, useEffect, useState } from "react";
import fetchData from "../../libs/api";
import Slab from "./Slab";

const SlabList = () => {
  // --------- Today's ---------
  const [todayRevenue, setTodayRevenue] = useState(0);
  const [todaySale, setTodaySale] = useState(0);

  // --------- Last Week ---------
  const [lastWeekRevenue, setLastWeekRevenue] = useState(0);
  const [lastWeekSale, setLastWeekSale] = useState(0);


    const [currentMonthRevenue, setCurrentMonthRevenue] = useState(0);
  const [currentMonthSale, setCurrentMonthSale] = useState(0);


  // --------- Last Month ---------
  const [lastMonthRevenue, setLastMonthRevenue] = useState(0);
  const [lastMonthSale, setLastMonthSale] = useState(0);


   const [currentYearRevenue, setCurrentYearRevenue] = useState(0);
  const [currentYearSale, setCurrentYearSale] = useState(0);


  // --------- Last Year ---------
  const [lastYearRevenue, setLastYearRevenue] = useState(0);
  const [lastYearSale, setLastYearSale] = useState(0);

  const [loader, setLoader] = useState(false);

  const getAllRevenueAndSale = useCallback(() => {
    setLoader(true);

    // ---------- Today's ----------
   

    fetchData(`/api/v1/dashboard/user/today-sell-amount`, "GET")
      .then(res => res.success && setTodaySale(res.data))
      .catch(console.debug);

       fetchData(`/api/v1/dashboard/user/today-revenue`, "GET")
      .then(res => res.success && setTodayRevenue(res.data))
      .catch(console.debug);

    // ---------- Last Week ----------
   

    fetchData(`/api/v1/dashboard/user/last-week-sale`, "GET")
      .then(res => res.success && setLastWeekSale(res.data))
      .catch(console.debug);

       fetchData(`/api/v1/dashboard/user/last-week`, "GET")
      .then(res => res.success && setLastWeekRevenue(res.data))
      .catch(console.debug);


       fetchData(`/api/v1/dashboard/user/current-month-sale`, "GET")
      .then(res => res.success && setCurrentMonthSale(res.data))
      .catch(console.debug);

        fetchData(`/api/v1/dashboard/user/current-month-revenue`, "GET")
      .then(res => res.success && setCurrentMonthRevenue(res.data))
      .catch(console.debug);




    // ---------- Last Month ----------
  
    fetchData(`/api/v1/dashboard/user/last-month-sale`, "GET")
      .then(res => res.success && setLastMonthSale(res.data))
      .catch(console.debug);

        fetchData(`/api/v1/dashboard/user/last-month-revenue`, "GET")
      .then(res => res.success && setLastMonthRevenue(res.data))
      .catch(console.debug);




      // ---------- Current Year ----------


          fetchData(`/api/v1/dashboard/user/current-year-sell`, "GET")
      .then(res => res.success && setCurrentYearSale(res.data))
      .catch(console.debug);

        fetchData(`/api/v1/dashboard/user/current-year-revenue`, "GET")
      .then(res => res.success && setCurrentYearRevenue(res.data))
      .catch(console.debug);



    // ---------- Last Year ----------
   

    fetchData(`/api/v1/dashboard/user/last-year-sale`, "GET")
      .then(res => res.success && setLastYearSale(res.data))
      .catch(console.debug)
      .finally(() => setLoader(false));


  }, []);

   fetchData(`/api/v1/dashboard/user/last-year-revenue`, "GET")
      .then(res => res.success && setLastYearRevenue(res.data))
      .catch(console.debug);

  useEffect(() => {
    getAllRevenueAndSale();
  }, []);




  


  
  return (
    <>
      {/* ---------- Today ---------- */}
  
  <Slab
  title={"Today's Sale"}
  amount={`৳ ${todaySale}`}
  style={{
    border: "2px solid #3b82f6",
    backgroundColor: "#eff6ff",
    color: "#1e40af",
  }}
/>

<Slab
  title={"Today's Revenue"}
  amount={`৳ ${todayRevenue}`}
  style={{
    border: "2px solid #22c55e",
    backgroundColor: "#ecfdf5",
    color: "#166534",
  }}
/>

{/* ---------- Last Week ---------- */}

<Slab
  title={"Last Week Sale"}
  amount={`৳ ${lastWeekSale}`}
  style={{
    border: "2px solid #3b82f6",
    backgroundColor: "#eff6ff",
    color: "#1e40af",
  }}
/>

<Slab
  title={"Last Week Revenue"}
  amount={`৳ ${lastWeekRevenue}`}
  style={{
    border: "2px solid #22c55e",
    backgroundColor: "#ecfdf5",
    color: "#166534",
  }}
/>


<Slab
  title={"Current Month Sale"}
  amount={`৳ ${currentMonthSale}`}
  style={{
    border: "2px solid #3b82f6",
    backgroundColor: "#eff6ff",
    color: "#1e40af",
  }}
/>

<Slab
  title={"Current Month Revenue"}
  amount={`৳ ${currentMonthRevenue}`}
  style={{
    border: "2px solid #22c55e",
    backgroundColor: "#ecfdf5",
    color: "#166534",
  }}
/>



{/* ---------- Last Month ---------- */}

<Slab
  title={"Last Month Sale"}
  amount={`৳ ${lastMonthSale}`}
  style={{
    border: "2px solid #3b82f6",
    backgroundColor: "#eff6ff",
    color: "#1e40af",
  }}
/>

<Slab
  title={"Last Month Revenue"}
  amount={`৳ ${lastMonthRevenue}`}
  style={{
    border: "2px solid #22c55e",
    backgroundColor: "#ecfdf5",
    color: "#166534",
  }}
/>


<Slab
  title={"Current Year Sale"}
  amount={`৳ ${currentYearSale}`}
  style={{
    border: "2px solid #3b82f6",
    backgroundColor: "#eff6ff",
    color: "#1e40af",
  }}
/>


<Slab
  title={"Current Year Revenue"}
  amount={`৳ ${currentYearRevenue}`}
  style={{
    border: "2px solid #22c55e",
    backgroundColor: "#ecfdf5",
    color: "#166534",
  }}
/>

{/* ---------- Last Year ---------- */}

<Slab
  title={"Last Year Sale"}
  amount={`৳ ${lastYearSale}`}
  style={{
    border: "2px solid #3b82f6",
    backgroundColor: "#eff6ff",
    color: "#1e40af",
  }}
/>

<Slab
  title={"Last Year Revenue"}
  amount={`৳ ${lastYearRevenue}`}
  style={{
    border: "2px solid #22c55e",
    backgroundColor: "#ecfdf5",
    color: "#166534",
  }}
/>



    </>
  );
};

export default SlabList;
