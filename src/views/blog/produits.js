import React, { useState, useEffect } from 'react';
import ProductCard from '../../components/productCard';

const Prix = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showStandard, setShowStandard] = useState(true);
  const [show23CV, setShow23CV] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost/Assu_Camping2/prix');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        console.log(data)
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Filter products based on checkbox states
    const filtered = products.filter(product => {
      if (product.typeContrat === 'Standard' && showStandard) {
        return true;
      }
      if (product.typeContrat === '23CV' && show23CV) {
        return true;
      }
      return false;
    });

    setFilteredProducts(filtered);
  }, [products, showStandard, show23CV]);



  return (
    <div className='px-4 py-8'>
      <div className="w-70 mx-auto">
        <div className="flex justify-center mb-4">
          <label className="mr-2">
            <input type="checkbox" checked={showStandard} onChange={() => setShowStandard(!showStandard)} /> Standard
          </label>
          <label>
            <input type="checkbox" checked={show23CV} onChange={() => setShow23CV(!show23CV)} /> 23CV
          </label>
        </div>
        <div className="flex flex-wrap justify-center">
          {filteredProducts.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Prix;

