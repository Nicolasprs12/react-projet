import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import JourRegle from '../../components/jour';
import BoutonModal from '../../components/modalBtn'; 

const Produit = () => {
    const { id } = useParams();
    const [product, setProduit] = useState(null);
    const [allproduct, setAllProduit] = useState([]);
    const [activeTab, setActiveTab] = useState(1); 
    const navigate = useNavigate();

    useEffect(() => {
        const pdcDuree = id.split('-')[0];
        const pdcContrat = id.split('-')[1];

        const fetchProduits = async () => {
            try {
                const response = await fetch('http://localhost/Assu_Camping2/prix');
                if (!response.ok) {
                    throw new Error('Échec de récupération du produit');
                }
                const data = await response.json();

                setAllProduit(data);
                // Filtrer les produits en fonction de l'ID de la durée et des types de contrat
                const product = data.find(prod => prod.duree.toString() === pdcDuree && (prod.typeContrat === pdcContrat));
                setProduit(product);
            } catch (error) {
                console.error('Erreur lors de la récupération du produit :', error);
            }
        };

        fetchProduits();
    }, [id]);

    const handleSubmit = (formData) => {
        navigate(`/formulaire`, { state: { formData, id } });
        // console.log(formData)
    };

    const handleTabChange = (tabNumber) => {
        setActiveTab(tabNumber);
    };

    // Filtrer les produits pour afficher uniquement ceux qui ne correspondent pas au produit actuel
    const filteredProducts = allproduct.filter(prod => prod !== product).slice(0, 3);

    const handleProductClick = (prod) => {
        const newId = `${prod.duree}-${prod.typeContrat}`;
        navigate(`/produit/${newId}`);
    };

    return (
        <div className="flex flex-col items-center px-4 py-8">
            <div className="bg-white shadow-lg rounded-lg p-4 lg:p-6 mb-4 w-full max-w-3xl">
                <div className="flex flex-col items-center md:flex-row md:items-center">
                    <div className="md:w-1/2 p-4">
                        <img src="https://www.atel.fr/images/logos/assurances-temporaires-en-ligne-petit-logo.webp" alt="logo" className="w-full h-auto" />
                    </div>
                    <div className="md:w-1/2 p-4 text-center md:text-left">
                        {product && (
                            <>
                                <h2 className="text-3xl font-semibold mb-4 text-gray-800">{product.duree} <JourRegle /></h2>
                                <div>
                                    <p className="mt-4 text-gray-800 text-xl">Prix : {product.prix} €</p>
                                    <p className="mt-4 text-gray-800">Type de contrat : {product.typeContrat}</p>
                                    <div className="mt-6">
                                        <BoutonModal text="Ouvrir le formulaire" onSubmit={handleSubmit} />
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
            
            <div className="flex justify-center mt-8">
                {filteredProducts.map((prod, index) => (
                    <button
                        key={index}
                        className={`mr-4 px-6 py-4 rounded-lg focus:outline-none ${activeTab === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'}`}
                        onClick={() => {
                            handleTabChange(index + 1);
                            handleProductClick(prod);
                        }}
                    >
                        {prod.duree} jours pour {prod.prix} €
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Produit;
