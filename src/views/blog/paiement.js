import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import JourRegle from '../../components/jour'

const Paiement = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [contrat, setContrat] = useState({});
    const [idContrat, setIdContrat] = useState("");

    useEffect(() => {
        if (location && location.state) {
            const { idContrat } = location.state;
            if (idContrat) setIdContrat(idContrat);
        }
    }, [location]);
    console.log(idContrat)

    useEffect(() => {
        const token = localStorage.getItem('sessionToken');
        if (!token) {
            navigate("/accueil");
            return;
        }
        const fetchContrat = async () => {
            try {
                const response = await fetch(`http://localhost/Assu_Camping2/paiement`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(idContrat)
                });
                if (!response.ok) {
                    throw new Error('Erreur dans la récupération du contrat');
                }
                const data = await response.json();
                setContrat(data[0]);
            } catch (error) {
                console.error('Erreur dans la récupération du contrat :', error);
            }
        };

        fetchContrat();
    }, [idContrat, navigate]);

    const boutonPayer = () => {
        const token = localStorage.getItem('sessionToken');
        if (!token) {
            navigate("/accueil");
            return;
        }
        const fetchPayer = async () => {
            try {
                const response = await fetch(`http://localhost/Assu_Camping2/payer`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(idContrat)
                });
                if (!response.ok) {
                    throw new Error('Erreur dans la récupération du contrat');
                }
                const data = await response.json();
                navigate("/compte");
                alert(data.message);
            } catch (error) {
                console.error('Erreur lors du paiement :', error);
            }
        };

        fetchPayer();
    };

    return (
        <div className="flex justify-center items-center p-10">
            <div className="bg-white shadow-md rounded-md p-4 m-2 max-w-xs w-full">
            {contrat ? (
                <div>
                    <h1 className="text-gray-800 md:mb-2 font-semibold text-center md:text-xl">Détails du Contrat</h1>
                    <p className="text-center text-gray-600 mb-1 md:mb-2">Prix : {contrat.prixTotal}€</p>
                    <p className="text-center text-gray-600 mb-1 md:mb-2">Immatriculation : {contrat.immatriculation}</p>
                    <p className="text-center text-gray-600 mb-1 md:mb-2">Marque : {contrat.marque}</p>
                    <p className="text-center text-gray-600 mb-1 md:mb-2">Type de contrat : {contrat.typeContrat}</p>
                    <p className="text-center text-gray-600 mb-1 md:mb-2">Durée : <JourRegle jour={contrat.duree} /></p>
                    <p className="text-center text-gray-600 mb-1 md:mb-2">Date de début : {contrat.debut}</p>
                    <p className="text-center text-gray-600 mb-1 md:mb-2">Heure de début : {contrat.heureDebut}</p>
                    <p className="text-center text-gray-600 mb-1 md:mb-2">Prénom : {contrat.prenom}</p>
                    <p className="text-center text-gray-600 mb-1 md:mb-2">Nom : {contrat.nom}</p>
                    <div className="text-center pt-3">
                        <button 
                            onClick={boutonPayer} 
                            className="rounded-lg bg-blue-500 px-4 py-2 text-white">
                            Paiement
                        </button>
                    </div>
                </div>
            ) : (
                <p className="text-center text-gray-600">Chargement...</p>
            )}
        </div>
        </div>
    );
};

export default Paiement;
