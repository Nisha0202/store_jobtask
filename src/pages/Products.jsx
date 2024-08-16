import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/products'); 
        setProducts(response.data);
      } catch (error) {
        setError(error.message || 'Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); 

  if (loading) {
    return <p  className=' w-screen h-screen grid place-content-center text-center'>
      <span className="loading loading-ball loading-lg"></span>
      </p>;
  }

  if (error) {
    return <p className=' w-screen h-screen grid place-content-center text-center'>Error: {error}</p>;
  }

  return (
    <div className="product-list grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 py-8">
      {products.map((product, index) => (
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
      ))}
    </div>
  );
}

