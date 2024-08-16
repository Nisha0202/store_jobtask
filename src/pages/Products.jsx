import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    search: '',
    brand: '',
    category: '',
    priceRange: '',
    sort: 'price',
    order: 'asc'
  });

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/products', {
        params: {
          page,
          limit: 9,

        }
      });
      setProducts(response.data);
      const totalCount = parseInt(response.headers['x-total-count'], 10);
      setTotalPages(6); // Calculate total pages
    } catch (error) {
      setError(error.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page, filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
    setPage(1); // Reset to page 1 on new filter
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  if (loading) {
    return (
      <p className='w-screen h-screen grid place-content-center text-center'>
        <span className="loading loading-ball loading-lg"></span>
      </p>
    );
  }

  if (error) {
    return (
      <p className='w-screen h-screen grid place-content-center text-center'>Error: {error}</p>
    );
  }

  return (
    <div className=''>
      <div className="filters mb-4">
        <input
          type="text"
          name="search"
          placeholder="Search"
          value={filters.search}
          onChange={handleFilterChange}
          className="input input-sm input-bordered w-24 md:w-auto"
        />
        <select
          name="brand"
          value={filters.brand}
          onChange={handleFilterChange}
          className="select select-bordered"
        >
          <option value="">Select Brand</option>
          {/* Populate with actual brand options */}
        </select>
        <select
          name="category"
          value={filters.category}
          onChange={handleFilterChange}
          className="select select-bordered"
        >
          <option value="">Select Category</option>
          {/* Populate with actual category options */}
        </select>
        <input
          type="text"
          name="priceRange"
          placeholder="Price Range (e.g., 10-50)"
          value={filters.priceRange}
          onChange={handleFilterChange}
          className="input input-sm input-bordered w-24 md:w-auto"
        />
        <select
          name="sort"
          value={filters.sort}
          onChange={handleFilterChange}
          className="select select-bordered"
        >
          <option value="price">Price</option>
          <option value="dateAdded">Date Added</option>
        </select>
        <select
          name="order"
          value={filters.order}
          onChange={handleFilterChange}
          className="select select-bordered"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      <div className="product-list grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 py-12 mb-6 relative min-h-[calc(100vh-100px)]">
        {Array.isArray(products) && products.length > 0 ? (
          products.map((product, index) => (
            <div key={index} className="max-w-80 mx-auto bg-white border border-gray-200 rounded-lg overflow-hidden">
              <img src={product.productImage} alt={product.productName} className="w-full h-52 object-cover" />
              <div className="p-4 text-sm">
                <h2 className="text-xl font-bold text-gray-800 mb-2">{product.productName}</h2>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className='flex items-center justify-between'>
                  <p className="text-gray-700 mb-2">Category: <span className="font-semibold">{product.category}</span></p>
                  <p className="text-gray-500 text-sm mb-2 font-medium">Ratings: <span className="text-orange-600 font-semibold">{product.ratings}</span></p>
                </div>
                <p className="text-xl font-bold text-green-600 mb-2">${product.price.toFixed(2)}</p>
                <div className='flex items-center justify-between'>
                  <p className="text-gray-500 text-sm">Launched on: <span className="text-sm">{product.creationDate.slice(0, 10)}</span></p>
                  <p className="text-gray-500 text-sm">Brand: <span className="text-sm font-bold text-blue-600">{product.brandName}</span></p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className='text-xl'>No products found.</p>
        )}

        <div className="pagination flex justify-center items-center gap-2 pt-10 text-sm absolute bottom-0 w-full">
          <button onClick={() => handlePageChange(page - 1)} disabled={page === 1} className="btn btn-sm">
            Previous
          </button>
          <span>Page {page} of {totalPages}</span>
          <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages} className="btn btn-sm">
            Next
          </button>
        </div>
      </div>
  
    </div>
  );
}
