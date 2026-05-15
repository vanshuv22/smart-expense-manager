import { useActionData } from "react-router-dom";

const Cart = ({ cart, removeProduct }) => {

  const total = cart.reduce(
    (acc, item) => acc + item.discountPrice * item.quantity,
    0,
  );


  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Shopping Cart
        </h2>

        {cart.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty</p>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center border rounded-xl p-4 shadow-sm hover:shadow-md transition"
              >
                <div>
                  <h4 className="text-xl font-semibold text-gray-700">
                    {item.name}
                  </h4>

                  <p className="text-gray-500">
                    Quantity:
                    <span className="font-medium"> {item.quantity}</span>
                  </p>

                  <p className="text-gray-500">
                    Price:
                    <span className="font-medium"> ₹ {item.discountPrice}</span>
                  </p>
                </div>

                <div>
                  <p className="text-lg font-bold text-green-600">
                    ₹ {item.discountPrice * item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 border-t pt-4 flex justify-between items-center">
          <h3 className="text-2xl font-bold text-gray-800">Grand Total:</h3>

          <span className="text-2xl font-bold text-blue-600">₹ {total}</span>
        </div>

        <button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-lg font-semibold transition duration-300">
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default Cart;
