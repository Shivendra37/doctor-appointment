import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllProductsApi } from '../../apis/Api';
import Navbar from '../../components/Navbar'; // Import Navbar
import '../../healthPackage.css'; 
const HealthPackages = () => {
  const [packages, setPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getAllProductsApi()
      .then((res) => {
        setPackages(res.data.products);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      });
  }, []);

  const handleBuyNow = (pkg) => {
    setSelectedPackage(pkg);
    setShowModal(true);
  };

  const handleConfirmBuy = () => {
    setShowModal(false);
    navigate('/checkout', { state: { selectedPackage } });
  };

  return (
    <>
      <Navbar /> {/* Add Navbar component */}
      <div className="container">
        <h1 style={{ paddingTop: "70px" }}>Health Packages</h1>
        <div className="row">
          {packages.map((pkg, index) => (
            <div key={index} className="col-lg-4 col-md-6 mb-4">
              <div className="card h-100">
                <img className="card-img-top" src={pkg.image} alt={pkg.name} />
                <div className="card-body">
                  <h4 className="card-title">{pkg.name}</h4>
                  <h4 className="card-title">Rs. {pkg.price}</h4>
                  <p className="card-text">{pkg.description}</p>
                </div>
                <div className="card-footer">
                  <button className="btn btn-primary" onClick={() => handleBuyNow(pkg)}>
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedPackage && (
          <div
            className={`modal fade ${showModal ? 'show' : ''}`}
            style={{ display: showModal ? 'block' : 'none' }}
            tabIndex="-1"
            role="dialog"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirm Purchase</h5>
                </div>
                <div className="modal-body">
                  <p>Are you sure you want to buy the {selectedPackage.name}?</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-danger" onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                  <button type="button" className="btn btn-primary" onClick={handleConfirmBuy}>
                    Yes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default HealthPackages;
