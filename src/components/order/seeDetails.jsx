import React, { useRef, useState } from "react";
import Modal from "../global/Modal";
import IndianaDragScroller from "../global/IndianaDragScroller";

const SeeDetails = ({ item }) => {
  const modalCloseButton = useRef();
  const [expandedImage, setExpandedImage] = useState(null); // clicked image

  return (
    <>
      <Modal
        modalId={"seeDetails" + item.id}
        modalHeader={"INVOICE #" + item.invoiceNumber}
        modalCloseButton={modalCloseButton}
      >
        <div className="form-group">
          <p className="text-black font-w500">Name: {item.customerName}</p>
          <p>Phone: {item.customerPhone}</p>
          <p>Email: {item.customerEmail}</p>
          <p>Address: {item.customerAddress}</p>
          <p>Postal Code: {item.customerPostalCode}</p>
          <p>Total Item: {item.totalItems}</p>
          <p>Order Date: {item.createdAt}</p>

          <p className="text-black font-w500 mt-3">Order Items</p>

          {/* Expanded image inside modal */}
          {expandedImage && (
            <div className="mb-4 flex justify-center">
              <img
                src={expandedImage}
                alt="Expanded"
                className="max-w-full max-h-96 rounded-lg shadow-lg object-contain"
              />
            </div>
          )}

          <IndianaDragScroller>
            <table className="w-full border-collapse border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-2">Image</th>
                  <th className="border p-2">Name</th>
                  <th className="border p-2">Size</th>
                  <th className="border p-2">Quantity</th>
                  <th className="border p-2">Price</th>
                  <th className="border p-2">Discounted Price</th>
                  <th className="border p-2">Total Price</th>
                </tr>
              </thead>
              <tbody>
                {item.orderItems?.map((orderItem, index) => (
                  <tr key={index} className="text-center">
                    <td className="border p-2">
                      {/* <img
                        src={orderItem.image}
                        alt={orderItem.name}
                        style={{
                          width: "60px",
                          height: "60px",
                          objectFit: "cover",
                          borderRadius: "8px",
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          setExpandedImage(
                            expandedImage === orderItem.image
                              ? null
                              : orderItem.image
                          )
                        }
                      /> */}
<div className="relative inline-block">
  <img
    src={orderItem.image}
    alt={orderItem.name}
    style={{
      width: expandedImage === orderItem.image ? "200px" : "60px",
      height: expandedImage === orderItem.image ? "200px" : "60px",
      objectFit: "cover",
      borderRadius: "8px",
      cursor: "pointer",
      transition: "all 0.3s ease-in-out",
    }}
    onClick={() =>
      setExpandedImage(
        expandedImage === orderItem.image ? null : orderItem.image
      )
    }
  />

  {/* Close button directly on image */}
  {expandedImage === orderItem.image && (
    <button
      onClick={() => setExpandedImage(null)}
      style={{
        position: "absolute",
        top: "5px",         // image-এর উপরের দিকে
        right: "5px",       // image-এর ডান দিকে
        background: "red",
        color: "white",
        borderRadius: "50%",
        width: "25px",
        height: "25px",
        border: "none",
        cursor: "pointer",
        fontWeight: "bold",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
      }}
    >
      ✕
    </button>
  )}
</div>

                    </td>
                    <td className="border p-2">{orderItem.name}</td>
                    <td className="border p-2">{orderItem.size}</td>
                    <td className="border p-2">{orderItem.quantity}</td>
                    <td className="border p-2">{orderItem.retailPrice}</td>
                    <td className="border p-2">{orderItem.discountedRetailPrice}</td>
                    <td className="border p-2">{orderItem.totalPrice}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="font-bold">
                  <td colSpan="6" className="text-right border p-2">
                    Subtotal:
                  </td>
                  <td className="border p-2">{item.subtotal}</td>
                </tr>
              </tfoot>
            </table>
          </IndianaDragScroller>
        </div>
      </Modal>
    </>
  );
};

export default SeeDetails;
