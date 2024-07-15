import React from 'react';

const packages = [
  {
    title: 'Basic Health Checkup',
    description: 'A comprehensive basic health checkup.',
    image: 'https://via.placeholder.com/400x200',
  },
  {
    title: 'Advanced Health Checkup',
    description: 'An advanced health checkup for detailed insights.',
    image: 'https://via.placeholder.com/400x200',
  },
  {
    title: 'Heart Health Package',
    description: 'A package focusing on heart health.',
    image: 'https://via.placeholder.com/400x200',
  },
  {
    title: 'Diabetes Care Package',
    description: 'A package tailored for diabetes care.',
    image: 'https://via.placeholder.com/400x200',
  },
  {
    title: 'Senior Citizen Package',
    description: 'A special package for senior citizens.',
    image: 'https://via.placeholder.com/400x200',
  },
  {
    title: 'Women Health Package',
    description: 'A package focusing on women\'s health.',
    image: 'https://via.placeholder.com/400x200',
  },
];

const HealthPackages = () => {
  const handleBuyNow = (title) => {
    console.log(`Buy Now clicked for ${title}`);
  };

  return (
    <div className="container">
      <h1 style={{ paddingTop: "70px" }}>Health Packages</h1>
      <div className="row">
        {packages.map((pkg, index) => (
          <div key={index} className="col-lg-4 col-md-6 mb-4">
            <div className="card h-100">
              <img className="card-img-top" src={pkg.image} alt={pkg.title} />
              <div className="card-body">
                <h4 className="card-title">{pkg.title}</h4>
                <p className="card-text">{pkg.description}</p>
              </div>
              <div className="card-footer">
                <button className="btn btn-primary" onClick={() => handleBuyNow(pkg.title)}>
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HealthPackages  
  