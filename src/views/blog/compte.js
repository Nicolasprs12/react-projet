import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import InfoPerso from '../../components/componentsCompte/infoPerso';
import ContratRecent from '../../components/componentsCompte/contratRecent';

const Compte = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('sessionToken'); // Récupérer le token JWT
            if (!token) {
                navigate("/accueil");
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
                // console.log(userData);
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
                    {/* Bannière */}
                    <div className="bg-gray-200 p-4 lg:p-8">
                        <h2 className="text-lg lg:text-2xl font-bold text-center">Mon Compte</h2>
                        <p className="text-sm lg:text-lg text-center mt-2 lg:mt-4">Bonjour {user.nom} {user.prenom}</p>
                        <p className="text-sm lg:text-lg text-center mt-2 lg:mt-4">Gérez vos informations et consultez vos commandes</p>
                    </div>

                    {/* Conteneur principal */}
                    <div className="max-w-screen-xl mx-auto py-4 lg:py-8 px-2 lg:px-4" style={{ width: '90%' }}>
                        <div className="flex flex-col lg:flex-row lg:space-x-4">
                             <div className="bg-white shadow-lg rounded-lg p-4 lg:p-6 mb-4 lg:mb-0 lg:flex-1">
                        <InfoPerso />
                               
                            </div> 
                            <div className="bg-white shadow-lg rounded-lg p-4 lg:p-6 lg:flex-1">
                        <ContratRecent />
                            </div>
                        </div>
                    </div>
                </>
            ) : (

                <p>Loading...</p>
            )}
        </div>
    );
};

export default Compte;
