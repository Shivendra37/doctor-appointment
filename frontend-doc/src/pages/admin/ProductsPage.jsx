/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import {
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  createProductApi,
  deleteProductApi,
  getAllProductsApi,
} from "../../apis/Api";
import Sidebar from "../../components/Sidebar";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [previewProductImage, setPreviewProductImage] = useState(null);

  // Image upload handler for product
  const handleProductImageUpload = (event) => {
    const file = event.target.files[0];
    setProductImage(file);
    setPreviewProductImage(URL.createObjectURL(file));
  };

  // Fetch products
  useEffect(() => {
    getAllProductsApi().then((res) => {
      setProducts(res.data.products);
    });
  }, []);

  // Submit function for products
  const handleProductSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", productName);
    formData.append("description", productDescription);
    formData.append("price", productPrice);
    formData.append("image", productImage);

    createProductApi(formData)
      .then((res) => {
        if (res.data.success === false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          // Refresh product list after adding
          getAllProductsApi().then((res) => {
            setProducts(res.data.products);
          });
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Internal Server Error!");
      });
  };

  // Delete function for products
  const handleProductDelete = (id) => {
    const confirm = window.confirm("Are you sure you want to delete this product?");
    if (!confirm) {
      return;
    } else {
      deleteProductApi(id).then((res) => {
        if (res.data.success === false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          // Refresh product list after deleting
          getAllProductsApi().then((res) => {
            setProducts(res.data.products);
          });
        }
      });
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-3 col-lg-2">
            <Sidebar />
          </div>

          {/* Content */}
          <div className="col-md-9 col-lg-10">
            <div className="row">
              <div className="col">
                <h1 style={{ marginTop: 20 }}>Products</h1>
                <button
                  type="button"
                  className="btn w-20 mb-2 btn btn-dark"
                  data-bs-toggle="modal"
                  data-bs-target="#productModal"
                >
                  Add Product
                </button>
                <table className="table mt-2">
                  <thead className="table-dark">
                    <tr>
                      <th>SN</th>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Price</th>
                      <th>Image</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product, index) => (
                      <tr key={product._id}>
                        <td>{index + 1}</td>
                        <td>{product.name}</td>
                        <td>{product.description}</td>
                        <td>{product.price}</td>
                        <td>
                          <img
                            src={product.image}
                            alt={product.name}
                            style={{ width: "50px", height: "50px" }}
                          />
                        </td>
                        <td>
                          <div className="d-flex">
                            <button
                              onClick={() => handleProductDelete(product._id)}
                              className="btn btn-danger"
                            >
                              <FontAwesomeIcon icon={faTrashAlt} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Product Modal */}
      <div
        className="modal fade"
        id="productModal"
        tabIndex="-1"
        aria-labelledby="productModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="productModalLabel">Add New Product</h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <label>Product Name</label>
              <input
                onChange={(e) => setProductName(e.target.value)}
                className="form-control mb-2"
                type="text"
                placeholder="Enter product name"
              />
              <label>Description</label>
              <textarea
                onChange={(e) => setProductDescription(e.target.value)}
                className="form-control mb-2"
                placeholder="Enter product description"
              />
              <label>Price</label>
              <input
                onChange={(e) => setProductPrice(e.target.value)}
                className="form-control mb-2"
                type="number"
                placeholder="Enter product price"
              />
              <label>Product Image</label>
              <input
                onChange={handleProductImageUpload}
                className="form-control mb-2"
                type="file"
                placeholder="Choose product image"
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                onClick={handleProductSubmit}
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsPage;
