import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDetH } from '../../config/formatDate';

const ContratRecent = () => {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [contratsRecent, setContratsRecent] = useState([]);

    useEffect(() => {
        const fetchContratsRecent = async () => {
            const token = localStorage.getItem('sessionToken');
            if (!token) {
                navigate("/connexion");
                return;
            }
            try {
                const contratResponse = await fetch("http://localhost/Assu_Camping2/ContratsRecents?limit=5", {
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
                setContratsRecent(contratData);

            } catch (error) {
                console.log(error);
                setError("An error occurred while fetching data.");
            }
        };

        fetchContratsRecent();
    }, [navigate]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            {contratsRecent.length > 0 ? (
                <div>
                    <div className="flex justify-between">
                        <span className="text-base lg:text-lg font-semibold mb-2 lg:mb-4">Contrats récents</span>
                        <a href="/contrats" className="text-blue-600 hover:text-blue-700 underline">Mes contrats</a>
                    </div>
                    <ul className="space-y-2 lg:space-y-4">
                        {contratsRecent.map((contratItem, index) => (
                            <li key={index} className="border-b border-gray-300 pb-2">
                                <div className="flex justify-between">
                                    <span className="text-sm lg:text-base">Véhicule {contratItem.Immatriculation}</span>
                                    <span className="text-sm lg:text-base text-gray-600">{formatDetH(contratItem.dateCreation)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm lg:text-base">{contratItem.Marque}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm lg:text-base"> Statut : {contratItem.Statut}</span>
                                    <span className="text-sm lg:text-base">Prix : {contratItem.prixTotal}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default ContratRecent;
