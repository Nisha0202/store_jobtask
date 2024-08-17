import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../FirebaseProbider/FirbaseProvider';


export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { usern } = useContext(AuthContext);
  const [isLogin, setLogin] = useState(false);
  useEffect(() => {
    setLogin(!!usern);
  }, [usern]);

  const [filters, setFilters] = useState({
    search: '',
    brand: '',
    category: '',
    priceRange: '',
    sort: 'price',
    order: 'asc'
  });

  const handlePriceRangeChange = (minPrice, maxPrice) => {
    if (minPrice === '' && maxPrice === '') {
      setFilters(prevFilters => ({
        ...prevFilters,
        priceRange: null, // clear
      }));
    } else {
      setFilters(prevFilters => ({
        ...prevFilters,
        priceRange: `${minPrice}-${maxPrice}`,
      }));
    }
  
    setPage(1); // Reset to page 1 on new filter
  };
  


  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/products', {
        params: {
          page,
          limit: 9,
          search: filters.search,
          brand: filters.brand,
          category: filters.category,
          priceRange: filters.priceRange,
          sort: filters.sort,
          order: filters.order,
        }
      });
      setProducts(response.data);

      setTotalPages(6);
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

  const handleSortChange = (sort, order) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      sort: sort || '',
      order: order || ''
    }));
  };


  const handleDateChange = (order) => {
    handleSortChange('creationDate', order);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };


  if (loading) {
    return (
      <p className='w-full h-screen grid place-content-center text-center'>
        <span className="loading loading-ball loading-lg"></span>
      </p>
    );
  }

  if (error) {
    return (
      <p className='w-full h-screen grid place-content-center text-center'>Error: {error}</p>
    );
  }

  const handleBrandChange = (brand) => {
    handleFilterChange({ target: { name: 'brand', value: brand } });
  };

  const handleCategoryChange = (category) => {
    handleFilterChange({ target: { name: 'category', value: category } });
  };

  const handleReload = () => {
    setFilters(prevFilters => ({ ...prevFilters, search: '' }));
  };


  return (
    <div className=''>
      {/* Filters */}
      {isLogin && 
      
        <div className="filters mb-1 flex flex-col lg:flex-row gap-4 items-center justify-between">
        <div className='w-full'>
          <input
            type="text"
            name="search"
            placeholder="Search"
            value={filters.search}
            onChange={handleFilterChange}
            className="input input-sm input-bordered min-w-72 md:w-auto"
          />
          <button onClick={handleReload} className='btn btn-sm m-2 justify-end'>Clear</button>
        </div>
        <div className='w-full'>
          <ul className="menu lg:menu-horizontal bg-base-200 z-40 rounded-box mb-4">
            <li>
              <details>
                <summary>Brand</summary>
                <ul className='z-20'>
                  <li><a onClick={() => handleBrandChange('EcoLife')}>EcoLife</a></li>
                  <li><a onClick={() => handleBrandChange('TechNova')}>TechNova</a></li>
                  <li><a onClick={() => handleBrandChange('FitPro')}>FitPro</a></li>
                  <li><a onClick={() => handleBrandChange('GourmetPal')}>GourmetPal</a></li>
                  <li><a onClick={() => handleBrandChange('UrbanStyle')}>UrbanStyle</a></li>
                  <li><a onClick={() => handleBrandChange('')}>Clear</a></li>
                </ul>
              </details>
            </li>
            <li>
              <details>
                <summary>Category</summary>
                <ul className='z-20'>
                  <li><a onClick={() => handleCategoryChange('Electronics')}>Electronics</a></li>
                  <li><a onClick={() => handleCategoryChange('Outdoor')}>Outdoor</a></li>
                  <li><a onClick={() => handleCategoryChange('Fitness')}>Fitness</a></li>
                  <li><a onClick={() => handleCategoryChange('Footwear')}>Footwear</a></li>
                  <li><a onClick={() => handleCategoryChange('Wearables')}>Wearables</a></li>
                  <li><a onClick={() => handleCategoryChange('Home')}>Home</a></li>
                  <li><a onClick={() => handleCategoryChange('Health')}>Health</a></li>
                  <li><a onClick={() => handleCategoryChange('Office')}>Office</a></li>
                  <li><a onClick={() => handleCategoryChange('Accessories')}>Accessories</a></li>
                  <li><a onClick={() => handleCategoryChange('Kitchen')}>Kitchen</a></li>
                  <li><a onClick={() => handleCategoryChange('Home Automation')}>Home Automation</a></li>
                  <li><a onClick={() => handleCategoryChange('')}>Clear</a></li>
                </ul>
              </details>
            </li>
            <li>
              <details>
                <summary>Price Range</summary>
                <ul className='z-20'>
                  <li><a onClick={() => handlePriceRangeChange(10, 30)}>$10 - $30</a></li>
                  <li><a onClick={() => handlePriceRangeChange(30, 60)}>$30 - $60</a></li>
                  <li><a onClick={() => handlePriceRangeChange(60, 100)}>$60 - $100</a></li>
                  <li><a onClick={() => handlePriceRangeChange(100, 200)}>$100 - $200</a></li>
                  <li><a onClick={() => handlePriceRangeChange('', '')}>Clear</a></li>
                </ul>
              </details>


            </li>
            <li>
              <details>
                <summary>Price</summary>
                <ul className='z-20'>
                  <li><a onClick={() => handleSortChange('price', 'asc')}>Low-High</a></li>
                  <li><a onClick={() => handleSortChange('price', 'desc')}>High-Low</a></li>
                  <li><a onClick={() => handleSortChange('', '')}>Clear</a></li>
                </ul>
              </details>
            </li>
            <li>
              <details>
                <summary>Date</summary>
                <ul className='z-20'>
                  <li><a onClick={() => handleDateChange('asc')}>Newest-Old</a></li>
                  <li><a onClick={() => handleDateChange('desc')}>Old-Newest</a></li>
                  <li><a onClick={() => handleDateChange('creationDate', '')}>Clear</a></li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
      </div>
      
      }
    

      {/* Product List */}
      <div className="product-list grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 pb-12 pt-6 lg:pt-12 mb-6 relative min-h-[calc(100vh-100px)]">
        {Array.isArray(products) && products.length > 0 ? (
          products.map((product, index) => (
            <div key={index} className="max-w-80 mx-auto h-[420px] bg-white border border-gray-200 rounded-lg overflow-hidden">
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

        {/* Pagination */}
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



