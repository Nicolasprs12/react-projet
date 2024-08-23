import React, { useState } from 'react';

const FormDoc = ({ formValues, onFormSubmitPre, onFormSubmit }) => {
    const [documents, setDocuments] = useState({
        permis: formValues ? formValues.permis : null,
        carteGrise: formValues ? formValues.carteGrise : null,
    });
    const [errors, setErrors] = useState({});

    console.log(documents)

    const handleChange = (e) => {
        const { id, value } = e.target;
        setDocuments({ ...documents, [id]: value });
        validateFields();
    };

    const handleSubmit = () => {
        if (validateFields()) {
            onFormSubmit(documents);
        }
    };

    const validateFields = () => {
        const newErrors = {};
        if (!documents.permis) {
            newErrors.permis = true;
        }
        if (!documents.carteGrise) {
            newErrors.carteGrise = true;
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Étape 4: Association de Documents</h2>
            <p className="mb-2">Téléchargez vos documents ici:</p>
            <label>Permis R/V :</label>
            <input
                id="permis"
                type="file"
                accept=".pdf,.png,.jpeg"
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-4 py-2 w-full"
            />
            <label>Carte Grise R/V :</label>
            <input
                id="carteGrise"
                type="file"
                accept=".pdf,.png,.jpeg"
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-4 py-2 w-full mt-2"
            />

            <div className="flex justify-between mt-4">
                <button onClick={() => onFormSubmitPre(documents)} className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md">
                    Précédent
                </button>
                <button
                    onClick={handleSubmit}
                    className={`bg-blue-500 text-white py-2 px-4 rounded-md ${Object.keys(errors).length > 0 ? 'cursor-not-allowed' : ''}`}
                    // disabled={Object.keys(errors).length > 0}
                    >
                    Suivant
                </button>
            </div>

        </div>
    );
};

export default FormDoc;