import { useState, useEffect } from "react";
import { toast } from "react-toastify";

function AddProduct({

  onProductAdded,
  editingProduct,
  setEditingProduct

}) {

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [rating, setRating] = useState("");
  const [discount, setDiscount] = useState("");

  // MULTIPLE IMAGES
  const [images, setImages] = useState([]);

  // EDIT MODE
  useEffect(() => {

    if (editingProduct) {

      setName(editingProduct.name || "");
      setBrand(editingProduct.brand || "");
      setCategory(editingProduct.category || "");

      setDescription(
        editingProduct.description || ""
      );

      setPrice(editingProduct.price || "");

      setStock(editingProduct.stock || "");

      setRating(editingProduct.rating || "");

      setDiscount(
        editingProduct.discount || ""
      );

      // LOAD OLD IMAGES
      if (editingProduct.images) {

        setImages(editingProduct.images);

      } else if (editingProduct.image) {

        setImages([editingProduct.image]);

      }
    }

  }, [editingProduct]);

  // IMAGE UPLOAD
 const handleImageChange = (e) => {

  const files = Array.from(
    e.target.files
  );

  if (
    images.length + files.length > 5
  ) {

    toast.error(
      "Maximum 5 images allowed ❌"
    );

    return;
  }

  const readers = [];

  files.forEach((file) => {

    const reader =
      new FileReader();

    reader.onloadend = () => {

      readers.push(reader.result);

      if (
        readers.length === files.length
      ) {

        setImages((prev) => [

          ...prev,
          ...readers

        ]);

      }

    };

    reader.readAsDataURL(file);

  });

};

  // REMOVE IMAGE
  const removeImage = (indexToRemove) => {

    const updated = images.filter(
      (_, index) =>
        index !== indexToRemove
    );

    setImages(updated);
  };

  // RESET FORM
  const resetForm = () => {

    setName("");
    setBrand("");
    setCategory("");
    setDescription("");
    setPrice("");
    setStock("");
    setRating("");
    setDiscount("");

    setImages([]);

    setEditingProduct(null);
  };

  // SUBMIT
  const handleSubmit = async (e) => {

    e.preventDefault();

    const productData = {

      name,
      brand,
      category,
      description,

      price: Number(price),

      stock: Number(stock),

      rating: Number(rating),

      discount: Number(discount),

      // MULTIPLE IMAGES
      images: images,

      // MAIN IMAGE
      image: images[0]
    };

    try {

      // EDIT PRODUCT
      if (editingProduct) {

        await fetch(
          `http://127.0.0.1:5000/update-product/${editingProduct._id}`,
          {
            method: "PUT",

            headers: {
              "Content-Type":
                "application/json"
            },

            body: JSON.stringify(
              productData
            )
          }
        );

        toast.success(
          "Product Updated Successfully ✅"
        );

      } else {

        // ADD PRODUCT
        await fetch(
          "http://127.0.0.1:5000/add-product",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json"
            },

            body: JSON.stringify(
              productData
            )
          }
        );

        toast.success(
          "Product Added Successfully ✅"
        );
      }

      // REFRESH PRODUCTS
      onProductAdded();

      // RESET
      resetForm();

    } catch (error) {

      toast.error(
        "Something went wrong ❌"
      );
    }
  };

  return (

    <div className="add-product">

      <h2>
        🛍️ Admin Dashboard
      </h2>

      <p>
        Add & manage ecommerce products
      </p>

      <form onSubmit={handleSubmit}>

        {/* PRODUCT NAME */}
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          required
        />

        {/* BRAND */}
        <input
          type="text"
          placeholder="Brand"
          value={brand}
          onChange={(e) =>
            setBrand(e.target.value)
          }
          required
        />

        {/* CATEGORY */}
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
          required
        />

        {/* PRICE */}
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) =>
            setPrice(e.target.value)
          }
          required
        />

        {/* STOCK */}
        <input
          type="number"
          placeholder="Stock Quantity"
          value={stock}
          onChange={(e) =>
            setStock(e.target.value)
          }
          required
        />

        {/* RATING */}
        <input
          type="number"
          step="0.1"
          placeholder="Rating (1-5)"
          value={rating}
          onChange={(e) =>
            setRating(e.target.value)
          }
        />

        {/* DISCOUNT */}
        <input
          type="number"
          placeholder="Discount %"
          value={discount}
          onChange={(e) =>
            setDiscount(e.target.value)
          }
        />

        {/* DESCRIPTION */}
        <textarea
          placeholder="Product Description"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
        />

        {/* MULTIPLE IMAGE UPLOAD */}
        <div className="multi-image-upload">

          {images.map((img, index) => (

            <div
              className="preview-box"
              key={index}
            >

              <img
                src={img}
                alt="preview"
                className="preview-image"
              />

              <button
                type="button"
                className="remove-image-btn"
                onClick={() =>
                  removeImage(index)
                }
              >
                ✖
              </button>

            </div>

          ))}

          {images.length < 5 && (

            <label className="upload-box">

  <span className="plus-icon">
    +
  </span>

  <input
    type="file"
    multiple
    accept="image/*"
    onChange={handleImageChange}
    style={{ display: "none" }}
  />

</label>

          )}

        </div>

        {/* BUTTONS */}
        <div
  style={{
    display: "flex",
    gap: "10px",
    marginTop: "20px",
    alignItems: "center",
    flexWrap: "wrap"
  }}
>

          <button type="submit">

            {editingProduct
              ? "Update Product"
              : "Add Product"}

          </button>

          {editingProduct && (

            <button
              type="button"
              onClick={resetForm}
              style={{
                background: "gray"
              }}
            >
              Cancel
            </button>

          )}

        </div>

      </form>

    </div>
  );
}

export default AddProduct;