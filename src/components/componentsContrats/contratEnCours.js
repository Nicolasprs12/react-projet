import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ContratsAttente = () => {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [contratsEnCours, setContratsEnCours] = useState([]);
    const [expandedContracts, setExpandedContracts] = useState({});
    const [currentPage, setCurrentPage] = useState(0);
    const contractsPerPage = 3;

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('sessionToken');
            if (!token) {
                navigate("/connexion");
                return;
            }
            try {
                const contratResponse = await fetch("http://localhost/Assu_Camping2/contrat", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (contratResponse.status === 401) {
                    setError("Unauthorized");
                    navigate("/connexion");
                    return;
                }

                const contratData = await contratResponse.json();
                const contratsEnCours = contratData.filter(contrat => contrat.statut === "En cours");

                // Trie les contratsEnAttente par date de création
                contratsEnCours.sort((a, b) => new Date(b.dateCreation) - new Date(a.dateCreation));

                setContratsEnCours(contratsEnCours);

            } catch (error) {
                console.log(error);
                setError("An error occurred while fetching data.");
            }
        };
        fetchUserData();
    }, [navigate]);

    const toggleContract = (index) => {
        setExpandedContracts(prevState => ({
            ...prevState,
            [index]: !prevState[index]
        }));
    };

    const handleNextPage = () => {
        if ((currentPage + 1) * contractsPerPage < contratsEnCours.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    const displayedContracts = contratsEnCours.slice(currentPage * contractsPerPage, (currentPage + 1) * contractsPerPage);

    return (
        <div>
            {contratsEnCours.length > 0 ? (
                <div className='p-2'>
                    <label className="text-base lg:text-lg font-semibold mb-2 lg:mb-4">Contrats en cours</label>
                    <ul className="space-y-2 lg:space-y-4">
                        {displayedContracts.map((contratItem, index) => (
                            <li key={index} className="bg-white shadow-lg rounded-lg p-4 lg:p-6 mb-4 lg:mb-0 lg:flex-1">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm lg:text-base">Véhicule : {contratItem.immatriculation}</span>
                                    <span className="text-sm lg:text-base text-gray-600">{contratItem.dateCreation}</span>
                                    <div className="text-sm lg:text-base">Marque : {contratItem.marque}</div>
                                    <div className="text-sm lg:text-base">Statut : {contratItem.statut}</div>
                                    <div className="text-sm lg:text-base">Prix : {contratItem.prixTotal} €</div>
                                    <button onClick={() => toggleContract(index)} className="ml-2 text-xl">
                                        {expandedContracts[index] ? '▼' : '>'}
                                    </button>
                                </div>
                                {expandedContracts[index] && (
                                    <div className="grid grid-cols-3 gap-4 pt-5">
                                        <div className="col-span-1">
                                            <label className="text-sm text-center font-semibold lg:text-base">Informations personnelles</label>
                                            <div className="text-sm lg:text-base">Prenom : {contratItem.prenom}</div>
                                            <div className="text-sm lg:text-base">Nom : {contratItem.nom}</div>
                                            <div className="text-sm lg:text-base">Genre : {contratItem.genre}</div>
                                            <div className="text-sm lg:text-base">Email : {contratItem.email}</div>
                                            <div className="text-sm lg:text-base">Adresse : {contratItem.numRue} {contratItem.adresse}</div>
                                            <div className="text-sm lg:text-base">Code Postal : {contratItem.cp}</div>
                                            <div className="text-sm lg:text-base">Ville : {contratItem.ville}</div>
                                            <div className="text-sm lg:text-base">Date de naissance : {contratItem.dateNaissance}</div>
                                            <div className="text-sm lg:text-base">Pays permis de conduire : {contratItem.paysPermis}</div>
                                        </div>
                                        <div className="col-span-1">
                                            <label className="text-sm text-center font-semibold lg:text-base">Informations véhicule</label>
                                            <div className="text-sm lg:text-base">Marque : {contratItem.marque}</div>
                                            <div className="text-sm lg:text-base">Modèle : {contratItem.modele}</div>
                                            <div className="text-sm lg:text-base">Pays d'origine : {contratItem.paysOrigine}</div>
                                            <div className="text-sm lg:text-base">Poids : {contratItem.poids}</div>
                                            <div className="text-sm lg:text-base">Immatriculation : {contratItem.numRue} {contratItem.immatriculation}</div>
                                            <div className="text-sm lg:text-base">Date de mis en circulation : {contratItem.dateMEC}</div>
                                            <div className="text-sm lg:text-base">Nombre de place : {contratItem.nombrePlace}</div>
                                            <div className="text-sm lg:text-base">Numéro idnetification : {contratItem.numIdentif}</div>
                                        </div>
                                        <div className="col-span-1">
                                            <label className="text-sm text-center font-semibold lg:text-base">Informations garantie</label>
                                            <div className="text-sm lg:text-base">Frais : {contratItem.frais} €</div>
                                            <div className="text-sm lg:text-base">Début : {contratItem.debut}</div>
                                            <div className="text-sm lg:text-base">Durée : {contratItem.duree} jours</div>
                                        </div>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                    <div className="flex justify-between mt-4">
                        {currentPage !== 0 && (
                            <button onClick={handlePrevPage} className="p-2 text-sky-800 underline rounded">
                                Précédent
                            </button>
                        )}
                        <div className="ml-auto">
                            {((currentPage + 1) * contractsPerPage < contratsEnCours.length) && (
                                <button onClick={handleNextPage} className="p-2 text-sky-800 underline rounded">
                                    Suivant
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                null
            )}
        </div>
    );
};

export default ContratsAttente;
