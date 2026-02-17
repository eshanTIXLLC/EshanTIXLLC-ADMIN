import React, { useCallback, useEffect, useState } from "react";
import fetchData from "../../libs/api";
import Slab from "./Slab";

const SlabList = () => {
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalCategory, setTotalCategory] = useState(0);
  const [totalCampaign, setTotalCampaign] = useState(0);
  const [totalProduct, setTotalProduct] = useState(0);
  const [totalOrder, setTotalOrder] = useState(0);
  const [totalDeliveredOrder, setTotalDeliveredOrder] = useState(0);
  const [totalPendingOrder, setTotalPendingOrder] = useState(0);
  const [totalCanceledOrder, setTotalCanceledOrder] = useState(0);
  const [totalInProgressOrder, setTotalInProgressOrder] = useState(0);
    const [todayTotalOrder, setTodayTotalOrder] = useState(0);


  // ✅ New: Today Sell & Revenue
  const [todaySellAmount, setTodaySellAmount] = useState(0);
  const [todayRevenue, setTodayRevenue] = useState(0);

  const [loader, setLoader] = useState(false);

  const getTotalSlabData = useCallback(() => {
    setLoader(true);

    // Today Sell Amount
    fetchData(`/api/v1/dashboard/user/today-sell-amount`, "GET")
      .then((res) => {
        if (res.success) setTodaySellAmount(res.data);
      })
      .catch(console.debug);

    // Today Revenue
    fetchData(`/api/v1/dashboard/user/today-revenue`, "GET")
      .then((res) => {
        if (res.success) setTodayRevenue(res.data);
      })
      .catch(console.debug);

    // Total Revenue
    fetchData(`/api/v1/dashboard/user/total-revenue`, "GET")
      .then((res) => {
        if (res.success) setTotalRevenue(res.data);
      })
      .catch(console.debug);

    // Total Category
    fetchData(`/api/v1/dashboard/user/total-category`, "GET")
      .then((res) => {
        if (res.success) setTotalCategory(res.data);
      })
      .catch(console.debug);

    // Total Campaign
    fetchData(`/api/v1/dashboard/user/total-campaign`, "GET")
      .then((res) => {
        if (res.success) setTotalCampaign(res.data);
      })
      .catch(console.debug);

    // Total Product
    fetchData(`/api/v1/dashboard/user/total-product`, "GET")
      .then((res) => {
        if (res.success) setTotalProduct(res.data);
      })
      .catch(console.debug);


        // 👉 today total order
    fetchData(`/api/v1/dashboard/user/today-total-order`, "GET")
      .then((result) => {
        if (result.success) {
          setTodayTotalOrder(result.data);
        }
      })
      .catch(console.debug);

    // Total Order
    fetchData(`/api/v1/dashboard/user/total-order`, "GET")
      .then((res) => {
        if (res.success) setTotalOrder(res.data);
      })
      .catch(console.debug);

    // Total Delivered Order
    fetchData(`/api/v1/dashboard/user/total-delivered-order`, "GET")
      .then((res) => {
        if (res.success) setTotalDeliveredOrder(res.data);
      })
      .catch(console.debug);

    // Total Pending Order
    fetchData(`/api/v1/dashboard/user/total-pending-order`, "GET")
      .then((res) => {
        if (res.success) setTotalPendingOrder(res.data);
      })
      .catch(console.debug);

    // Total Canceled Order
    fetchData(`/api/v1/dashboard/user/total-canceled-order`, "GET")
      .then((res) => {
        if (res.success) setTotalCanceledOrder(res.data);
      })
      .catch(console.debug);

    // Total In Progress Order
    fetchData(`/api/v1/dashboard/user/total-in-progress-order`, "GET")
      .then((res) => {
        if (res.success) setTotalInProgressOrder(res.data);
      })
      .catch(console.debug)
      .finally(() => setLoader(false));
  }, []);

  useEffect(() => {
    getTotalSlabData();
  }, []);

  return (
    <>
      {/* Today Sell Slab */}
      <Slab
        title={"Today's Sell"}
        amount={todaySellAmount}
        style={{
          border: "2px solid #22c55e",
          backgroundColor: "#ecfdf5",
        }}
      />

      {/* Today Revenue Slab */}
      <Slab
        title={"Today's Revenue"}
        amount={todayRevenue}
        style={{
          border: "2px solid #22c55e",
          backgroundColor: "#ecfdf5",
        }}
      />

      <Slab title={"Total Revenue"} amount={totalRevenue} />
      <Slab title={"Total Category"} amount={totalCategory} />
      {/* <Slab title={"Total Campaign"} amount={totalCampaign} /> */}
      <Slab title={"Total Product"} amount={totalProduct} />
            <Slab title={"Today's Order"} amount={todayTotalOrder} bounce />

      <Slab title={"Total Order"} amount={totalOrder} />
      <Slab title={"Total Delivered Order"} amount={totalDeliveredOrder} />
      <Slab title={"Total Pending Order"} amount={totalPendingOrder} />
      <Slab title={"Total Canceled Order"} amount={totalCanceledOrder} />
      <Slab title={"Total Shipped Order"} amount={totalInProgressOrder} />
    </>
  );
};

export default SlabList;
