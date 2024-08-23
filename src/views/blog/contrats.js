import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import ContratsAttente from '../../components/componentsContrats/contratEnAttente';
import ContratsSauve from '../../components/componentsContrats/contratSauve';
import ContratsTerm from '../../components/componentsContrats/contratTerm';
import ContratsEnCours from '../../components/componentsContrats/contratEnCours';

const Contrats = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('sessionToken');
            if (!token) {
                navigate("/acceuil");
                return;
            }
            try {
                const response = await fetch("http://localhost/Assu_Camping2/compte", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (response.status === 401) {
                    setError("Unauthorized");
                    navigate("/connexion");
                    return;
                }

                const userData = await response.json();
                setUser(userData);

            } catch (error) {
                console.log(error);
                setError("An error occurred while fetching data.");
            }
        };

        fetchUserData();
    }, [navigate]);

    if (error) {
        return <div>Error: {error}</div>;
    }



    return (
        <div>
            {user ? (
                <>
                    <div className="bg-gray-200 p-4 lg:p-8">
                        <h2 className="text-lg lg:text-2xl font-bold text-center">Mon Compte</h2>
                        <p className="text-sm lg:text-lg text-center mt-2 lg:mt-4">Bonjour {user.nom} {user.prenom}</p>
                        <p className="text-sm lg:text-lg text-center mt-2 lg:mt-4">Gérez vos informations et consultez vos commandes</p>
                    </div>
                    {/* <div className="max-w-screen-xl mx-auto pt-2 lg:pt-4 px-2 lg:px-4 mb-2 lg:mb-4" style={{ width: '90%' }}>
                    <a href="/compte" className="text-blue-600 hover:text-blue-700 underline">Retour</a>
                    </div> */}
                    <div className="max-w-screen-xl mx-auto py-4 lg:py-8 px-2 lg:px-4" style={{ width: '90%' }}>
                        <div>
                            <ContratsAttente />
                        </div>

                        <div>
                            <ContratsSauve />
                        </div>

                        <div>
                            <ContratsTerm />
                        </div>

                        <div>
                            <ContratsEnCours />
                        </div>

                    </div>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Contrats;
