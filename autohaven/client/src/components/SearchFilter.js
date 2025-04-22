import React, { useState } from 'react';

const SearchFilter = ({ onSearch }) => {
  const [filters, setFilters] = useState({
    make: '',
    priceMin: '',
    priceMax: '',
    yearMin: '',
    yearMax: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(filters);
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">Search Cars</h5>
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-4">
              <label htmlFor="make" className="form-label">
                Make
              </label>
              <input
                type="text"
                className="form-control"
                id="make"
                name="make"
                value={filters.make}
                onChange={handleChange}
                placeholder="Any make"
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="priceMin" className="form-label">
                Min Price
              </label>
              <input
                type="number"
                className="form-control"
                id="priceMin"
                name="priceMin"
                value={filters.priceMin}
                onChange={handleChange}
                placeholder="Min price"
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="priceMax" className="form-label">
                Max Price
              </label>
              <input
                type="number"
                className="form-control"
                id="priceMax"
                name="priceMax"
                value={filters.priceMax}
                onChange={handleChange}
                placeholder="Max price"
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="yearMin" className="form-label">
                Min Year
              </label>
              <input
                type="number"
                className="form-control"
                id="yearMin"
                name="yearMin"
                value={filters.yearMin}
                onChange={handleChange}
                placeholder="Min year"
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="yearMax" className="form-label">
                Max Year
              </label>
              <input
                type="number"
                className="form-control"
                id="yearMax"
                name="yearMax"
                value={filters.yearMax}
                onChange={handleChange}
                placeholder="Max year"
              />
            </div>
            <div className="col-md-4 d-flex align-items-end">
              <button type="submit" className="btn btn-primary w-100">
                Search
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchFilter;