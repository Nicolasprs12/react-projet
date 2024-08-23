import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { requestManager } from "../../config/RequestManager";

const Connexion = () => {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const url_server = "http://localhost/Assu_Camping2/connexion";
            const signinResponse = await requestManager(url_server, "POST", {
                email: email,
                password: password,
            });
            
            const responseSignup = await signinResponse.json();
            console.log(responseSignup);
            if (responseSignup.isSuccess) {
                localStorage.setItem('sessionToken', responseSignup.token);
                navigate(`/compte`);
                console.log(localStorage); 
                alert(responseSignup.message);
            } else {
                console.log('Error:', responseSignup.message);
                setError(responseSignup.message);
            }

        } catch (error) {
            console.log(error);
        }
    };


    return (
            <div className="max-w-screen-xl mx-auto py-8 px-4">
                <form onSubmit={handleSubmit}>
                    <h2 className="flex justify-center text-2xl font-semibold mb-6 text-gray-800 ">Connexion</h2>
                    <div className="mb-4">
                        <div className="max-w-sm mx-auto p-8 bg-white dark:bg-gray-900 shadow-md rounded-lg ">
                            <label htmlFor="email" className="block text-gray-800 dark:text-white mb-1">Email</label>
                            <input
                                type="email"
                                id="email"
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />

                            <div className="mb-6">
                                <label htmlFor="password" className="block text-gray-800 dark:text-white mb-1">Mot de passe</label>
                                <input
                                    type="password"
                                    id="password"
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            {error && <div className="mt-4 text-red-500">{error}</div>}

                            <div className="mt-6 flex justify-center">
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                                    Connexion
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
                <div className="flex justify-center mt-4">
                    <a href="/creacompte" className="text-blue-600 hover:text-blue-700 underline">Créer un compte</a>
                </div>
            </div>
    );
};

export default Connexion;






//         {
//     alertMessage && (
//         <p className="text-medium text-red-800 font-bold text-center my-3">
//             {alertMessage}
//         </p>
//     )
// }