import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function Payment() {
  const locationState = useLocation();
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card"); // default
  const [paymentData, setPaymentData] = useState({
    holderName: "",
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  if (!locationState.state) return <h2>Payment Page</h2>;

  const { appointmentId, doctorName, location, date, totalFee } =
    locationState.state;

  useEffect(() => {
    setMessage(
      `Booked an appointment with ${doctorName} on ${date} at ${location} successfully!`
    );
  }, []);

  const handleChange = (e) => {
    setPaymentData({ ...paymentData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/payment/create/${appointmentId}`,
        paymentData,
        { headers: { "Content-Type": "application/json" } }
      );

      alert("Payment Successful!");
      navigate("/home");
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "450px" }}>


      <div style={{ marginBottom: "20px", color: "green" }}>{message}</div>

      <h2>Payment Page</h2>

      {/* Payment Method Selection */}
      <label style={{ fontWeight: "bold" }}>Select Payment Method</label>
      <select
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "20px" }}
      >
        <option value="card">Credit / Debit Card</option>
        <option value="upi">UPI</option>
        <option value="netbanking">Net Banking</option>
      </select>

      <form onSubmit={handleSubmit}>
        {/* CARD PAYMENT FIELDS */}
        {paymentMethod === "card" && (
          <>
            <label>Card Holder Name</label>
            <input
              type="text"
              name="holderName"
              value={paymentData.holderName}
              onChange={handleChange}
              required
              style={{ width: "100%", marginBottom: "10px" }}
            />

            <label>Card Type</label>
            <input
              type="text"
              name="cardName"
              value={paymentData.cardName}
              onChange={handleChange}
              placeholder="VISA / MasterCard"
              required
              style={{ width: "100%", marginBottom: "10px" }}
            />

            <label>Card Number</label>
            <input
              type="text"
              name="cardNumber"
              value={paymentData.cardNumber}
              onChange={handleChange}
              required
              style={{ width: "100%", marginBottom: "10px" }}
            />

            <label>Expiry Date</label>
            <input
              type="text"
              name="expiryDate"
              value={paymentData.expiryDate}
              onChange={handleChange}
              placeholder="MM/YYYY"
              required
              style={{ width: "100%", marginBottom: "10px" }}
            />

            <label>CVV</label>
            <input
              type="password"
              name="cvv"
              value={paymentData.cvv}
              onChange={handleChange}
              required
              style={{ width: "100%", marginBottom: "20px" }}
            />
          </>
        )}

        {/* UPI PAYMENT */}
        {paymentMethod === "upi" && (
          <>
            <label>UPI ID</label>
            <input
              type="text"
              name="upiId"
              placeholder="example@upi"
              style={{ width: "100%", marginBottom: "20px" }}
            />
          </>
        )}

        {/* NET BANKING */}
        {paymentMethod === "netbanking" && (
          <>
            <label>Select Bank</label>
            <select style={{ width: "100%", marginBottom: "20px" }}>
              <option value="">-- Select Bank --</option>
              <option value="hdfc">HDFC Bank</option>
              <option value="icici">ICICI Bank</option>
              <option value="sbi">State Bank of India</option>
              <option value="axis">Axis Bank</option>
            </select>
          </>
        )}
        <div style={{ fontWeight: "bold", marginBottom: "20px" }}>
            Total Fee: ${totalFee}
          </div>


        <button
          type="submit"
          style={{
            marginTop: "10px",
            padding: "10px 20px",
            width: "100%",
            fontSize: "16px",
          }}
        >
          Pay Now
        </button>
      </form>
    </div>
  );
}

export default Payment;
