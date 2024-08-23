import React, { useState, useEffect } from 'react';
import InputForm from '../inputForm';

const FormGarantie = ({ selectProd, onFormSubmitPre, onFormSubmit, formValues }) => {
    const [allProduits, setAllProd] = useState([]);
    const [selectedTypeContrat, setSelectedTypeContrat] = useState("");
    const [selectedDuree, setSelectedDuree] = useState("");
    const [prix, setPrix] = useState("");
    const [errors, setErrors] = useState({});

    const [informationsGarantie, setInformationsGarantie] = useState({
        selectedTypeContrat: formValues && formValues.selectedTypeContrat ? formValues.selectedTypeContrat : '',
        selectedDuree: formValues && formValues.selectedDuree ? formValues.selectedDuree : '',
        prix: formValues && formValues.prix ? formValues.prix : '',
        dateDebut: formValues && formValues.dateDebut ? formValues.dateDebut : '',
        heureDebut: formValues && formValues.heureDebut ? formValues.heureDebut : '',
    });
    
    const pdcDuree = selectProd.split('-')[0];
    const pdcContrat = selectProd.split('-')[1];

    useEffect(() => {
        const fetchGaranties = async () => {
            try {
                const response = await fetch('http://localhost/Assu_Camping2/prix');
                if (!response.ok) {
                    throw new Error('Failed to fetch garanties');
                }
                const data = await response.json();
                setAllProd(data);
                const selectedProd = data.find(prod => prod.duree.toString() === pdcDuree && prod.typeContrat === pdcContrat);
                if (selectedProd) {
                    setSelectedTypeContrat(selectedProd.typeContrat.toString());
                    setSelectedDuree(selectedProd.duree.toString());
                    setPrix(selectedProd.prix);
                }
            } catch (error) {
                console.error('Error fetching garanties:', error);
            }
        };

        fetchGaranties();
    }, [pdcContrat, pdcDuree]);

    useEffect(() => {
        setInformationsGarantie(prevState => ({
            ...prevState,
            selectedTypeContrat,
            selectedDuree,
            prix
        }));
    }, [selectedTypeContrat, selectedDuree, prix]);

    const handleDureeChange = (event) => {
        const selectedDuree = event.target.value;
        setSelectedDuree(selectedDuree);
        const selectedGarantie = allProduits.find(prod => prod.duree === parseInt(selectedDuree) && prod.typeContrat === selectedTypeContrat);
        if (selectedGarantie) {
            setPrix(selectedGarantie.prix);
        } else {
            setPrix("");
        }
    };

    const handleTypeContratChange = (event) => {
        const selectedType = event.target.value;
        setSelectedTypeContrat(selectedType);
        const selectedGarantie = allProduits.find(prod => prod.typeContrat === selectedType && prod.duree === parseInt(selectedDuree));
        if (selectedGarantie) {
            setPrix(selectedGarantie.prix);
        } else {
            setPrix("");
        }
    };

    const validateFields = () => {
        const newErrors = {};
        if (!informationsGarantie.dateDebut) {
            newErrors.dateDebut = true;
        }
        if (!informationsGarantie.heureDebut) {
            newErrors.heureDebut = true;
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validateFields()) {
            onFormSubmit(informationsGarantie);
        }
    };
    
    const handleChange = (e) => {
        const { id, value } = e.target;
        setInformationsGarantie({ ...informationsGarantie, [id]: value });
        validateFields();
    };

    return (
        <div>
            <div>
                <h2 className="text-2xl font-bold mb-4">Étape 3 : Garantie</h2>

                <div>
                    <label htmlFor="typeContrat" className="block mb-1">Type de contrat :</label>
                    <div>
                        <input
                            type="radio"
                            id="standard"
                            name="typeContrat"
                            value="Standard"
                            checked={selectedTypeContrat === "Standard"}
                            onChange={handleTypeContratChange}
                        />
                        <label htmlFor="standard" className="ml-2">Standard</label>
                        <input
                            type="radio"
                            id="23CV"
                            name="typeContrat"
                            value="23CV"
                            checked={selectedTypeContrat === "23CV"}
                            onChange={handleTypeContratChange}
                            className="ml-4"
                        />
                        <label htmlFor="23CV" className="ml-2">23CV</label>
                    </div>
                    {errors.selectedTypeContrat && <span className="text-red-500 text-sm">Ce champ est obligatoire</span>}
                </div>

                <div className="mt-4">
                    <label htmlFor="duree" className="block mb-1">Durée :</label>
                    <select
                        id="duree"
                        value={selectedDuree}
                        onChange={handleDureeChange}
                        className={`border rounded-md px-4 py-2 w-full ${errors.selectedDuree ? 'border-red-500' : 'border-gray-300'}`}
                    >
                        <option value="">Sélectionner une durée</option>
                        {allProduits
                            .filter(prod => prod.typeContrat === selectedTypeContrat)
                            .map(prod => (
                                <option key={prod.idPrixVente} value={prod.duree}>{prod.duree}</option>
                            ))}
                    </select>
                    {errors.selectedDuree && <span className="text-red-500 text-sm">Ce champ est obligatoire</span>}
                </div>
                <div className="mt-4">
                    <label htmlFor="prix" className="block mb-1">Prix :</label>
                    <input
                        id="prix"
                        type="text"
                        value={prix}
                        readOnly
                        className="border border-gray-300 rounded-md px-4 py-2 w-full"
                    />
                </div>

                <InputForm
                    htmlFor="dateDebut"
                    label="Date de début du contrat :"
                    type="date"
                    id="dateDebut"
                    placeholder="Date de mise en circulation"
                    required={true}
                    value={informationsGarantie.dateDebut}
                    onChange={handleChange}
                    className={`border rounded-md px-4 py-2 w-full ${errors.dateDebut ? 'border-red-500' : 'border-gray-300'}`}
                />


                <InputForm
                    htmlFor="heureDebut"
                    label="Heure de début du contrat :"
                    type="time"
                    id="heureDebut"
                    value={informationsGarantie.heureDebut || ''}
                    required={true}
                    onChange={handleChange}
                    className={`mt-4 ${errors.heureDebut ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.heureDebut && <span className="text-red-500 text-sm">Ce champ est obligatoire</span>}

                {/* Boutons */}
                <div className="flex justify-between mt-4">
                    <button onClick={() => onFormSubmitPre(informationsGarantie)} className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md">
                        Précédent
                    </button>
                    <button
                        onClick={handleSubmit}
                        className={`bg-blue-500 text-white py-2 px-4 rounded-md ${Object.keys(errors).length > 0 ? 'cursor-not-allowed' : ''}`}
                        disabled={Object.keys(errors).length > 0}>
                        Suivant
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FormGarantie;
