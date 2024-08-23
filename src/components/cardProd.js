import React, { useState, useEffect } from 'react';
import ProductCard from './productCard'


const ProductList = ({ displayOnly }) => {
    const [products, setProducts] = useState([]);
  
    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const response = await fetch('http://localhost/Assu_Camping2/prix');
          if (!response.ok) {
            throw new Error('Failed to fetch products');
          }
          const data = await response.json();
          setProducts(data);
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };
  
      fetchProducts();
    }, []);
  
    return (
      <div className="w-70 mx-auto">
      <div className="flex flex-wrap justify-center">

        {products.map((product, index) => (
    
          displayOnly.includes(index) && (
            <ProductCard 
             product={product} />
          )
        ))}
        </div>
      </div>
    );
  };
  
  export default ProductList;
