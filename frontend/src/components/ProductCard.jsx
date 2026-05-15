const ProductCard = ({ product, addToCart }) => {
  return (
    <div className="border p-4 rounded w-60 shadow">
      <img src={product.image} alt="" />

      <h2>{product.name}</h2>

      <p className="line-through">₹ {product.price}</p>
      <p className="text-[green] font-bold">₹ {product.discountPrice}</p>

      <button
        onClick={() => addToCart(product)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium shadow-md transition duration-300"
      >
        Add To Cart
      </button>
    </div>
  );
};

export default ProductCard;
