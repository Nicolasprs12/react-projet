import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreaCompte() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
            const url_server = "http://localhost/Assu_Camping2/creacompte";
            const signinResponse = await fetch(url_server, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    nom,
                    prenom,
                    password,
                }),
            });

            const responseSignup = await signinResponse.json();
            if (responseSignup.isSuccess) {
                navigate(`/connexion`);
                alert(responseSignup.message);
            } else {
                setError(responseSignup.message);
            }

    };

    return (
            <div className="max-w-screen-xl mx-auto py-8 px-4">
                <form onSubmit={handleSubmit}>
                    <h2 className="flex justify-center text-2xl font-semibold mb-6 text-gray-800">Création de Compte</h2>

                    <div className="max-w-sm mx-auto p-8 bg-white dark:bg-gray-900 shadow-md rounded-lg">
                        <label htmlFor="email" className="block text-gray-800 dark:text-white mb-1">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <label htmlFor="nom" className="block text-gray-800 dark:text-white mt-4 mb-1">Nom</label>
                        <input
                            type="text"
                            id="nom"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
                            value={nom}
                            onChange={(e) => setNom(e.target.value)}
                            required
                        />
                        <label htmlFor="prenom" className="block text-gray-800 dark:text-white mt-4 mb-1">Prénom</label>
                        <input
                            type="text"
                            id="prenom"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
                            value={prenom}
                            onChange={(e) => setPrenom(e.target.value)}
                            required
                        />
                        <label htmlFor="password" className="block text-gray-800 dark:text-white mt-4 mb-1">Mot de passe</label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {error && <div className="mt-4 text-red-500">{error}</div>}
                        <div className="mt-6 flex justify-center">
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                                Enregistrement
                            </button>
                        </div>
                    </div>
                </form>
                <div className="flex justify-center mt-4">
                    <a href="/connexion" className="text-blue-600 hover:text-blue-700 underline">Connexion</a>
                </div>
            </div>
    );
}

export default CreaCompte;
