// import React from "react";

// const OrderSuccess = () => {
//   return (
//     <div className="text-center text-success p-3 mt-4">
//       OrderSuccess - Your order placed Successfully
//     </div>


//   );
// };

// export default OrderSuccess;

import React from "react";

const OrderSuccess = () => {
  const handleHomeRedirect = () => {
    window.location.href = '/'; // Adjust the path as needed for your home page
  };

  return (
    <div className="text-center text-success p-3 mt-4">
      <h2>Order Successful!</h2>
      <p>Your order has been placed successfully. Thank you for your purchase!</p>
      <button className="btn btn-primary mt-3" onClick={handleHomeRedirect}>
        Go to Home Page
      </button>
    </div>
  );
};

export default OrderSuccess;
