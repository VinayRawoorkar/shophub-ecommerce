import ProductModal from "./ProductModal";
import { useState } from "react";

function ProductCard({

  product,
  addToCart,
  addToWishlist,
  isAdmin,
  deleteProduct,
  editProduct

}) {

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (

    <>

      <div className="product-card">

        {/* PRODUCT IMAGE */}
        <img
  src={
    product.images?.[0] ||
    product.image
  }
  alt={product.name}
  className="product-image"
  onClick={openModal}
/>

        {/* PRODUCT DETAILS */}
        <div onClick={openModal}>

          <h2>
            {product.name}
          </h2>

          <p className="brand">
            {product.brand}
          </p>

          <p>
            {product.category}
          </p>

          <h1 className="price">
            ₹ {product.price}
          </h1>

          <p>
            ⭐ {product.rating}
          </p>

          <p className="stock">

            Stock:
            {" "}
            {product.stock}

          </p>

        </div>

        {/* CUSTOMER */}
        {

          !isAdmin && (

            <div className="product-buttons">

              <button

                className="wishlist-btn"

                onClick={() =>
                  addToWishlist(product)
                }

              >

                ❤️ Wishlist

              </button>

              {

                product.stock <= 0 ? (

                  <button
                    className="out-stock-btn"
                    disabled
                  >

                    Out Of Stock

                  </button>

                ) : (

                  <button
                    className="cart-btn"
                    onClick={() =>
                      addToCart(product)
                    }
                  >

                    Add to Cart

                  </button>

                )

              }

            </div>

          )

        }

        {/* ADMIN */}
        {

          isAdmin && (

            <div className="product-buttons">

              <button

                className="cart-btn"

                onClick={() =>
                  editProduct(product)
                }

              >

                Edit

              </button>

              <button

                className="wishlist-btn"

                onClick={() =>
                  deleteProduct(product._id)
                }

              >
                
                Delete

              </button>

            </div>

          )

        }

      </div>

      {/* PRODUCT MODAL */}
      {

        isModalOpen && (

          <ProductModal

  product={product}

  isAdmin={isAdmin}

  onClose={closeModal}

  addToCart={addToCart}

  addToWishlist={addToWishlist}

/>

        )

      }

    </>

  );
}

export default ProductCard;