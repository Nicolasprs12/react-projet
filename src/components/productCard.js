import React from 'react';
import JourRegle from './jour'


const ProductCard = ({ product }) => {
    return (
        <div className="bg-white shadow-md rounded-md p-4 m-2 max-w-xs h-430">
            <img src="https://www.atel.fr/images/logos/assurances-temporaires-en-ligne-petit-logo.webp"
                alt={product.name}
                className="w-full h-auto mb-2 rounded-md max-w-[100px]]:" />
            <h1 className="text-gray-800 md:mb-2 font-semibold text-center md:text-xl"><JourRegle jour={product.duree} /></h1>
            <p className="text-center md:text-xl  text-gray-600 mb-1 md:mb-2 justify-center">{product.prix}€</p>
            <p className="text-center text-xs md:text-sm text-gray-800">{product.typeContrat}</p>
            <div className="text-center pt-3">
                <a
                    href={`produit/${product.duree}-${product.typeContrat}`}
                    className="rounded-lg bg-blue-300 px-4 py-2 text-white">Voir plus</a>
            </div>
        </div>
    );
};

export default ProductCard;