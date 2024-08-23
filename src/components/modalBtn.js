import React, { useState } from "react";
// import { useNavigate } from 'react-router-dom';
import FormPays from './formPays';

const BoutonModal = ({ text, onSubmit }) => {
    const [informationsPersonnelles, setInformationsPersonnelles] = useState({ dateNaissance: '' });
    const [informationsVehicule, setInformationsVehicule] = useState({ poids: '', origVehi: '' });
    const [modalVisible, setModalVisible] = useState(false);
    const [errorAge, setErrorAge] = useState('');

    const handleFormSubmit = (e) => {
        e.preventDefault();
        verifierConditions();
    };

    const handleRetour = () => {
        setModalVisible(false);
    };

    const handleOriginVehiChange = (origVehi) => {
        setInformationsVehicule({ ...informationsVehicule, origVehi: origVehi });
    };

    const verifierConditions = () => {
        const dateNaissance = new Date(informationsPersonnelles.dateNaissance);
        const dateActuelle = new Date();

        let age = dateActuelle.getFullYear() - dateNaissance.getFullYear();

        const moisAnniversaire = dateNaissance.getMonth();
        const jourAnniversaire = dateNaissance.getDate();
        const moisActuel = dateActuelle.getMonth();
        const jourActuel = dateActuelle.getDate();

        // Vérifier si l'anniversaire de la personne n'a pas encore eu lieu cette année
        if (moisActuel < moisAnniversaire || (moisActuel === moisAnniversaire && jourActuel < jourAnniversaire)) {
            age--;
        }

        const poidsVehicule = parseFloat(informationsVehicule.poids);

        if (age >= 19 && poidsVehicule <= 3.5) {
            onSubmit({ informationsPersonnelles, informationsVehicule });
            // navigate(`/formulaire`);
            setModalVisible(false);
        } else {
            setErrorAge('Vous devez avoir au moins 19 ans.');
            alert("Désolé, vous ne remplissez pas les conditions pour accéder à l'étape suivante.");
        }
    };

    console.log(informationsVehicule.origVehi)

    return (
        <div>
            {modalVisible && (
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-8 rounded-lg">
                        <h2 className="text-2xl font-bold mb-4">Pré-Étape: Conditions</h2>
                        <form onSubmit={handleFormSubmit}>
                            <div className="space-y-4">
                                <label htmlFor="dateNaissance">Date de Naissance : {errorAge && <p className="text-red-500">{errorAge}</p>}</label>
                                <input
                                    type="date"
                                    id="dateNaissance"
                                    value={informationsPersonnelles.dateNaissance}
                                    onChange={(e) => setInformationsPersonnelles({ ...informationsPersonnelles, dateNaissance: e.target.value })}
                                    className="border border-gray-300 rounded-md px-4 py-2 w-full"
                                />
                                <FormPays
                                    htmlFor="origVehi"
                                    label="Pays du véhicule:"
                                    id="origVehi"
                                    value={informationsVehicule.origVehi}
                                    paysListe={informationsVehicule.origVehi}
                                    onChange={handleOriginVehiChange}
                                />
                                <label htmlFor="poids">Poids du véhicule (en tonnes):</label>
                                <input
                                    type="number"
                                    id="poids"
                                    value={informationsVehicule.poids}
                                    onChange={(e) => setInformationsVehicule({ ...informationsVehicule, poids: e.target.value })}
                                    className="border border-gray-300 rounded-md px-4 py-2 w-full"
                                />
                            </div>
                            <button type="button" onClick={handleRetour} className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md">
                                Retour
                            </button>
                            <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md">
                                Suivant
                            </button>

                        </form>
                    </div>
                </div>
            )}
            <button onClick={() => setModalVisible(true)}>{text}</button>
        </div>
    );
};


export default BoutonModal;
