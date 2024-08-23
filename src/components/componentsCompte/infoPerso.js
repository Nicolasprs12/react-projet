import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const InfoPerso = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");
    const [isEditing, setIsEditing] = useState(false);
        const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: ''
    });
   
//Fetch informations
    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('sessionToken');
            if (!token) {
                navigate("/connexion");
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
                setFormData({
                    nom: userData.nom,
                    prenom: userData.prenom,
                    email: userData.email
                });

            } catch (error) {
                console.log(error);
                setError("An error occurred while fetching data.");
            }
        };

        fetchUserData();
    }, [navigate]);


    //Envoi Modif


    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('sessionToken');
        try {
            const response = await fetch("http://localhost/Assu_Camping2/compteUpdate", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const updatedUser = await response.json();
                setUser(updatedUser);
                setIsEditing(false);
                alert(updatedUser.message);
                window.location.reload();
            } else {
                setError("Problème avec l'enregistrement de vos informations");
            }
        } catch (error) {
            console.log(error);
            setError("Problème avec l'enregistrement de vos informations");
        }
    };

    //Gestion error
    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            {user ? (
                isEditing ? (
                    <form onSubmit={handleFormSubmit}>
                        <div>
                            <label className="block text-sm lg:text-base font-medium">Nom:</label>
                            <input
                                type="text"
                                name="nom"
                                value={formData.nom}
                                onChange={handleInputChange}
                                className="block w-full border border-gray-300 rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm lg:text-base font-medium">Prénom:</label>
                            <input
                                type="text"
                                name="prenom"
                                value={formData.prenom}
                                onChange={handleInputChange}
                                className="block w-full border border-gray-300 rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm lg:text-base font-medium">Email:</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="block w-full border border-gray-300 rounded-md"
                            />
                        </div>
                        <button
                            type="submit"
                            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
                        >
                            Enregistrer
                        </button>
                    </form>
                ) : (
                    <div>
                        <div className="flex justify-between">
                            <span className="text-base lg:text-lg font-semibold mb-2 lg:mb-4">Informations personnelles</span>
                            <button
                                onClick={handleEditClick}
                                className="text-blue-600 hover:text-blue-700 underline"
                            >
                                Modifier
                            </button>
                        </div>
                        <div>
                            <div>
                                <p className="text-sm lg:text-base font-medium">Nom :</p>
                                <p className="text-sm lg:text-base font-normal">{user.nom}</p>
                            </div>
                            <div>
                                <p className="text-sm lg:text-base font-medium">Prénom :</p>
                                <p className="text-sm lg:text-base font-normal">{user.prenom}</p>
                            </div>
                            <div>
                                <p className="text-sm lg:text-base font-medium">Email :</p>
                                <p className="text-sm lg:text-base font-normal">{user.email}</p>
                            </div>
                        </div>
                    </div>
                )
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default InfoPerso;
