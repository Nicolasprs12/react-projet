import React, { useState } from 'react';
import FormPays from '../formPays';
import InputForm from '../inputForm';

const FormInfoVehi = ({ origVehi, poids, onFormSubmit, onFormSubmitPre, formValues }) => {
    const [informationsVehicule, setInformationsVehicule] = useState({
        marque: formValues && formValues.marque ? formValues.marque : '',
        modele: formValues && formValues.modele ? formValues.modele : '',
        origVehi: origVehi,
        poids: poids,
        immatriculation: formValues && formValues.immatriculation ? formValues.immatriculation : '',
        dateMEC: formValues && formValues.dateMEC ? formValues.dateMEC : '',
        nombrePlace: formValues && formValues.nombrePlace ? formValues.nombrePlace : '',
        numIdentif: formValues && formValues.numIdentif ? formValues.numIdentif : '',
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { id, value } = e.target;
        setInformationsVehicule({ ...informationsVehicule, [id]: value });
        validateFields();
    };

    const validateFields = () => {
        const newErrors = {};
        if (!informationsVehicule.marque) {
            newErrors.marque = true;
        }
        if (!informationsVehicule.modele) {
            newErrors.modele = true;
        }
        if (!informationsVehicule.immatriculation) {
            newErrors.immatriculation = true;
        }
        if (!informationsVehicule.dateMEC) {
            newErrors.dateMEC = true;
        }
        if (!informationsVehicule.nombrePlace) {
            newErrors.nombrePlace = true;
        }
        if (!informationsVehicule.numIdentif) {
            newErrors.numIdentif = true;
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validateFields()) {
            onFormSubmit(informationsVehicule);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Étape 2: Informations sur le Véhicule</h2>
            <div className="space-y-4">
                <InputForm
                    htmlFor="marque"
                    label="Marque :"
                    type="text"
                    id="marque"
                    placeholder="Marque"
                    required={true}
                    value={informationsVehicule.marque}
                    onChange={handleChange}
                    className={`border rounded-md px-4 py-2 w-full ${errors.marque ? 'border-red-500' : 'border-gray-300'}`}
                />

                <InputForm
                    htmlFor="modele"
                    label="Modèle :"
                    type="text"
                    id="modele"
                    placeholder="Modèle"
                    required={true}
                    value={informationsVehicule.modele}
                    onChange={handleChange}
                    className={`border rounded-md px-4 py-2 w-full ${errors.modele ? 'border-red-500' : 'border-gray-300'}`}
                />

                <FormPays
                    htmlFor="origVehi"
                    label="Pays d'origine :"
                    id="origVehi"
                    value={origVehi}
                    defaut={origVehi}
                    disabled={true}
                    className={`border rounded-md px-4 py-2 w-full border-gray-600'}`}
                />

                <InputForm
                    htmlFor="poids"
                    label="Poids :"
                    id="poids"
                    placeholder="Poids"
                    disabled={true}
                    value={informationsVehicule.poids}
                    onChange={handleChange}
                    className={`border rounded-md px-4 py-2 w-full border-gray-600'}`}
                />

                <InputForm
                    htmlFor="immatriculation"
                    label="Immatriculation :"
                    type="text"
                    id="immatriculation"
                    placeholder="Immatriculation"
                    required={true}
                    value={informationsVehicule.immatriculation}
                    onChange={handleChange}
                    className={`border rounded-md px-4 py-2 w-full ${errors.immatriculation ? 'border-red-500' : 'border-gray-300'}`}
                />

                <InputForm
                    htmlFor="dateMEC"
                    label="Date de mise en circulation :"
                    type="date"
                    id="dateMEC"
                    placeholder="Date de mise en circulation"
                    required={true}
                    value={informationsVehicule.dateMEC}
                    onChange={handleChange}
                    className={`border rounded-md px-4 py-2 w-full ${errors.dateMEC ? 'border-red-500' : 'border-gray-300'}`}
                />

                <InputForm
                    htmlFor="nombrePlace"
                    label="Nombre de place :"
                    type="number"
                    id="nombrePlace"
                    placeholder="Nombre de place"
                    required={true}
                    value={informationsVehicule.nombrePlace}
                    onChange={handleChange}
                    className={`border rounded-md px-4 py-2 w-full ${errors.nombrePlace ? 'border-red-500' : 'border-gray-300'}`}
                />

                <InputForm
                    htmlFor="numIdentif"
                    label="Numéro identification :"
                    type="number"
                    id="numIdentif"
                    placeholder="Numéro identification"
                    required={true}
                    value={informationsVehicule.numIdentif}
                    onChange={handleChange}
                    className={`border rounded-md px-4 py-2 w-full ${errors.numIdentif ? 'border-red-500' : 'border-gray-300'}`}
                />

            </div>

            <div className="flex justify-between mt-4">
                <button onClick={() => onFormSubmitPre(informationsVehicule)} className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md">
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
    );
};

export default FormInfoVehi;
