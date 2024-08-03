import { ChangeEvent, useState } from "react";
import { useCartStore } from "@/hooks/useCartStore";

const CheckoutPage = () => {
  const { cart } = useCartStore();
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentDetails({ ...paymentDetails, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Payment Submitted! This is a demo.');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Checkout</h1>
      <h2 className="text-xl mb-4">Order Summary</h2>
      <div className="border p-4 mb-4">
        {cart.lineItems && cart.lineItems.length > 0 ? (
          cart.lineItems.map((item) => (
            <div key={item._id} className="flex justify-between mb-2">
              <span>{item.productName?.original}</span>
              <span>${item.price?.amount} x {item.quantity}</span>
            </div>
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}
        {cart.lineItems && cart.lineItems.length > 0 && (
          <div className="flex justify-between font-semibold">
            <span>Subtotal</span>
            <span>${cart.subtotal.amount}</span>
          </div>
        )}
      </div>
      <h2 className="text-xl mb-4">Payment Information</h2>
      <form onSubmit={handleSubmit} className="border p-4">
        <div className="mb-4">
          <label className="block mb-2">Card Number</label>
          <input
            type="text"
            name="cardNumber"
            value={paymentDetails.cardNumber}
            onChange={handleInputChange}
            className="w-full border px-2 py-1"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Expiry Date</label>
          <input
            type="text"
            name="expiryDate"
            value={paymentDetails.expiryDate}
            onChange={handleInputChange}
            className="w-full border px-2 py-1"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">CVV</label>
          <input
            type="text"
            name="cvv"
            value={paymentDetails.cvv}
            onChange={handleInputChange}
            className="w-full border px-2 py-1"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Submit Payment
        </button>
      </form>
    </div>
  );
};

export default CheckoutPage;
