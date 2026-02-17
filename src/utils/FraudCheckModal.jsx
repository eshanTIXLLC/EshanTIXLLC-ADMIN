import React, { useState } from "react";
import Button from "../global/Button";
import { showErrorToast, showSuccessToast } from "../../utils/toast";

const FraudCheckModal = ({ isOpen, onClose, customerPhone }) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleFraudCheck = async () => {
    if (!customerPhone) return;

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch(`/api/v1/fraud-check-order?phone=${customerPhone}`, {
        method: "GET",
      });

      const data = await res.json();

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

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>Fraud Check</h3>
        <p>
          <b>Phone:</b> {customerPhone}
        </p>
        <Button
          buttonText={loading ? "Checking..." : "Run Fraud Check"}
          buttonOnClick={handleFraudCheck}
        />

        {result && (
          <div className="result">
            <p>
              <b>Status:</b> {result.status}
            </p>
            <p>
              <b>Risk Level:</b> {result.riskLevel}
            </p>
            <p>
              <b>Remarks:</b> {result.remarks}
            </p>
          </div>
        )}

        <Button buttonText="Close" buttonOnClick={onClose} />
      </div>
    </div>
  );
};

export default FraudCheckModal;
