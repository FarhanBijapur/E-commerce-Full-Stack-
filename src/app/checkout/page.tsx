"use client";  // Ensure this is at the top

import { ChangeEvent, useState } from "react";
import { useCartStore } from "@/hooks/useCartStore";
import confetti from "canvas-confetti";
import { FaLock } from 'react-icons/fa'; // Importing lock icon

const CheckoutPage = () => {
  const { cart } = useCartStore();
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const [deliveryDetails, setDeliveryDetails] = useState({
    address: '',
    city: '',
    postalCode: ''
  });

  const [deliveryMethod, setDeliveryMethod] = useState('standard');
  const [promoCode, setPromoCode] = useState('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentDetails({ ...paymentDetails, [name]: value });
  };

  const handleCustomerChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerDetails({ ...customerDetails, [name]: value });
  };

  const handleDeliveryChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDeliveryDetails({ ...deliveryDetails, [name]: value });
  };

  const handleDeliveryMethodChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setDeliveryMethod(e.target.value);
  };

  const handlePromoCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPromoCode(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    confetti();  // Trigger confetti
    alert('Payment Submitted!');
    // Clear cart after submission
    // await clearCart(); // Ensure clearCart is implemented
  };

  // Check if cart.lineItems is defined and is an array
  const lineItems = cart.lineItems || [];
  const subtotal = lineItems.reduce((sum, item) => sum + (item.price?.amount || 0) * (item.quantity || 0), 0);
  const taxes = subtotal * 0.1; // Example tax calculation
  const deliveryCharges = deliveryMethod === 'express' ? 20 : 5; // Example delivery charges
  const total = subtotal + taxes + deliveryCharges;

  return (
    <div className="container mx-auto p-4 flex">
      <div className="w-2/3 pr-4">
        <h1 className="text-2xl mb-4">Checkout</h1>

        <h2 className="text-xl mb-4">Customer Details</h2>
        <div className="border p-4 mb-4">
          <div className="mb-4">
            <label className="block mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={customerDetails.name}
              onChange={handleCustomerChange}
              className="w-full border px-2 py-1"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={customerDetails.email}
              onChange={handleCustomerChange}
              className="w-full border px-2 py-1"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Phone</label>
            <input
              type="tel"
              name="phone"
              value={customerDetails.phone}
              onChange={handleCustomerChange}
              className="w-full border px-2 py-1"
              required
            />
          </div>
        </div>

        <h2 className="text-xl mb-4">Delivery Details</h2>
        <div className="border p-4 mb-4">
          <div className="mb-4">
            <label className="block mb-2">Address</label>
            <input
              type="text"
              name="address"
              value={deliveryDetails.address}
              onChange={handleDeliveryChange}
              className="w-full border px-2 py-1"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">City</label>
            <input
              type="text"
              name="city"
              value={deliveryDetails.city}
              onChange={handleDeliveryChange}
              className="w-full border px-2 py-1"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Postal Code</label>
            <input
              type="text"
              name="postalCode"
              value={deliveryDetails.postalCode}
              onChange={handleDeliveryChange}
              className="w-full border px-2 py-1"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Delivery Method</label>
            <select
              value={deliveryMethod}
              onChange={handleDeliveryMethodChange}
              className="w-full border px-2 py-1"
            >
              <option value="standard">Standard - $5</option>
              <option value="express">Express - $20</option>
            </select>
          </div>
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

      <div className="w-1/3 pl-4">
        <div className="border p-4 bg-gray-200 rounded"> {/* Changed background color */}
          <h2 className="text-xl mb-4">Order Summary</h2>
          {lineItems.length > 0 ? (
            <>
              <div className="mb-4">
                <h3 className="text-lg mb-2">Items</h3>
                {lineItems.map((item) => (
                  <div key={item._id} className="flex justify-between mb-2">
                    <span>{item.productName?.original} (x{item.quantity})</span>
                    <span>${(item.price?.amount || 0) * (item.quantity || 0)}</span>
                  </div>
                ))}
              </div>
              <div className="mb-2">
                <strong>Subtotal:</strong> ${subtotal.toFixed(2)}
              </div>
              <div className="mb-2">
                <strong>Taxes:</strong> ${taxes.toFixed(2)}
              </div>
              <div className="mb-2">
                <strong>Delivery:</strong> ${deliveryCharges.toFixed(2)}
              </div>
              <div className="mb-4">
                <strong>Total:</strong> ${total.toFixed(2)}
              </div>
            </>
          ) : (
            <p>Your cart is empty.</p>
          )}
          <div className="mb-4">
            <label className="block mb-2">Promo Code</label>
            <input
              type="text"
              value={promoCode}
              onChange={handlePromoCodeChange}
              className="w-full border px-2 py-1"
            />
          </div>
          <div className="flex items-center text-blue-500 font-bold">
            <FaLock className="mr-2" />
            Secure Checkout
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
