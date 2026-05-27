import { useState } from "react";

function ProductModal({

  product,
  isAdmin,
  onClose,
  addToCart,
  addToWishlist

}) {

  if (!product) return null;

  // GET ALL IMAGES
  const productImages = [

    ...(product.images || []),

    ...(product.image
      ? [product.image]
      : [])

  ].filter(Boolean);

  // MAIN IMAGE
  const [mainImage, setMainImage] =
    useState(
      productImages[0]
    );

  return (

    <div className="modal-overlay">

      <div className="product-modal">

        {/* CLOSE BUTTON */}
        <button
          className="close-modal"
          onClick={onClose}
        >
          ✖
        </button>

        {/* LEFT SIDE */}
        <div className="modal-left">

          {/* MAIN IMAGE */}
          <img
            src={mainImage}
            alt={product.name}
            className="main-modal-image"
          />

          {/* THUMBNAILS */}
          <div className="modal-thumbnail-row">

            {productImages.map((img, index) => (

              <img

                key={index}

                src={img}

                alt="product"

                className={`thumbnail-image ${
                  mainImage === img
                    ? "active-thumb"
                    : ""
                }`}

                onClick={() =>
                  setMainImage(img)
                }

              />

            ))}

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="modal-details">

          <h1>
            {product.name}
          </h1>

          <h2>
            {product.brand}
          </h2>

          <p>
            {product.category}
          </p>

          <h1 className="modal-price">
            ₹ {product.price}
          </h1>

          <p>
            ⭐ {product.rating}
          </p>

          <p className="stock-text">

            Stock:
            {" "}
            {product.stock}

          </p>

          {/* DESCRIPTION */}
          <div className="description-box">

            <h3>
              Product Description
            </h3>

            <p>
              {product.description}
            </p>

          </div>

          {/* BUTTONS */}
{

  

  !isAdmin && (

    <div className="modal-buttons">

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

        <i className="ti ti-shopping-cart"></i>

        Add To Cart

      </button>

    )

  }

  <button

    className="wishlist-btn"

    onClick={() =>
      addToWishlist(product)
    }

  >

    <i className="ti ti-heart-filled"></i>

    Wishlist

  </button>

</div>
  )

}

        </div>

      </div>

    </div>
  );
}

export default ProductModal;