import React, { useEffect, useState } from "react";
import { showErrorToast, showSuccessToast } from "../../utils/toast";

const FraudCheckModal = ({ isOpen, onClose, customerPhone }) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (!isOpen || !customerPhone) return;

    const fetchFraud = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `http://localhost:8000/api/fraud-check-order?phone=${customerPhone}`
        );
        const data = await res.json();
        console.log("Fraud API response:", data);

        if (data.success) {
          setResult(data.data);
          showSuccessToast("Fraud check completed");
        } else {
          showErrorToast(data.message || "Fraud check failed");
        }
      } catch (err) {
        console.error(err);
        showErrorToast("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchFraud();
  }, [isOpen, customerPhone]);

  if (!isOpen) return null;

  // ✅ Calculate delivery success rate
  const getSuccessRate = () => {
    if (!result) return 0;
    const total = result.total_parcels;
    const delivered = result.total_delivered;
    if (total === 0) return 0;
    return Math.round((delivered / total) * 100);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          width: "500px",
          maxHeight: "80vh",
          backgroundColor: "#fff",
          borderRadius: "8px",
          padding: "20px",
          overflowY: "auto",
          boxShadow: "0px 4px 20px rgba(0,0,0,0.3)",
        }}
      >
        <h2 style={{ marginBottom: "10px", color: "#333" }}>
          Fraud Check for {customerPhone}
        </h2>

        {loading && <p style={{ color: "#666" }}>Loading...</p>}

        {!loading && result && (
          <div>
            <p>
              <strong>Total Parcels:</strong> {result.total_parcels} <br />
              <strong>Delivered:</strong> {result.total_delivered} <br />
              <strong>Cancelled:</strong> {result.total_cancel}
            </p>

            <p>
              <strong>Delivery Success Rate:</strong>{" "}
              {getSuccessRate()}%
            </p>

            {getSuccessRate() >= 90 && (
              <p
                style={{
                  color: "green",
                  fontWeight: "bold",
                  marginBottom: "10px",
                }}
              >
                ✅ You can deliver this order to the customer
              </p>
            )}

            <h3 style={{ marginTop: "15px", marginBottom: "5px" }}>
              Courier Details:
            </h3>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                marginBottom: "10px",
              }}
            >
              <thead>
                <tr>
                  <th
                    style={{
                      border: "1px solid #ddd",
                      padding: "6px",
                      backgroundColor: "#f7f7f7",
                      textAlign: "left",
                    }}
                  >
                    Courier
                  </th>
                  <th
                    style={{
                      border: "1px solid #ddd",
                      padding: "6px",
                      backgroundColor: "#f7f7f7",
                      textAlign: "center",
                    }}
                  >
                    Total
                  </th>
                  <th
                    style={{
                      border: "1px solid #ddd",
                      padding: "6px",
                      backgroundColor: "#f7f7f7",
                      textAlign: "center",
                    }}
                  >
                    Delivered
                  </th>
                  <th
                    style={{
                      border: "1px solid #ddd",
                      padding: "6px",
                      backgroundColor: "#f7f7f7",
                      textAlign: "center",
                    }}
                  >
                    Cancelled
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(result.apis).map((courier) => (
                  <tr key={courier}>
                    <td
                      style={{
                        border: "1px solid #ddd",
                        padding: "6px",
                        color: "#333",
                      }}
                    >
                      {result.apis[courier].courier_name}
                    </td>
                    <td
                      style={{
                        border: "1px solid #ddd",
                        padding: "6px",
                        textAlign: "center",
                      }}
                    >
                      {result.apis[courier].total_parcels}
                    </td>
                    <td
                      style={{
                        border: "1px solid #ddd",
                        padding: "6px",
                        textAlign: "center",
                        color: "green",
                      }}
                    >
                      {result.apis[courier].total_delivered_parcels}
                    </td>
                    <td
                      style={{
                        border: "1px solid #ddd",
                        padding: "6px",
                        textAlign: "center",
                        color: "red",
                      }}
                    >
                      {result.apis[courier].total_cancelled_parcels}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <button
          onClick={onClose}
          style={{
            marginTop: "10px",
            padding: "8px 15px",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "#3498db",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default FraudCheckModal;
