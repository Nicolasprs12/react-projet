import React, { useState } from 'react';
import FormPays from '../formPays';
import InputForm from '../inputForm';

const FormInfoPerso = ({ dateNaissance, formValues, onFormSubmit, selectProd }) => {
    const [informationsPersonnelles, setInformationsPersonnelles] = useState({
        genre: formValues && formValues.genre ? formValues.genre : '',
        nom: formValues && formValues.nom ? formValues.nom : '',
        prenom: formValues && formValues.prenom ? formValues.prenom : '',
        dateNaissance: dateNaissance,
        email: formValues && formValues.email ? formValues.email : '',
        telephone: formValues && formValues.telephone ? formValues.telephone : '',
        numRue: formValues && formValues.numRue ? formValues.numRue : '',
        adresse: formValues && formValues.adresse ? formValues.adresse : '',
        codePostal: formValues && formValues.codePostal ? formValues.codePostal : '',
        ville: formValues && formValues.ville ? formValues.ville : '',
        pays: formValues && formValues.pays ? formValues.pays : '',
        numPermis: formValues && formValues.numPermis ? formValues.numPermis : '',
        datePermis: formValues && formValues.datePermis ? formValues.datePermis : '',
        paysPermis: formValues && formValues.paysPermis ? formValues.paysPermis : '',
    });
    const [errors, setErrors] = useState({});

    const handlePaysChange = (pays) => {
        setInformationsPersonnelles({ ...informationsPersonnelles, pays: pays });
        validateFields();
    };

    const handlepaysPermisChange = (paysPermis) => {
        setInformationsPersonnelles({ ...informationsPersonnelles, paysPermis: paysPermis });
        validateFields();
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setInformationsPersonnelles({ ...informationsPersonnelles, [id]: value });
        validateFields();
    };

    const validateFields = () => {
        const newErrors = {};
        if (!informationsPersonnelles.genre) {
            newErrors.genre = true;
        }
        if (!informationsPersonnelles.nom) {
            newErrors.nom = true;
        }
        if (!informationsPersonnelles.prenom) {
            newErrors.prenom = true;
        }
        if (!informationsPersonnelles.dateNaissance) {
            newErrors.dateNaissance = true;
        }
        if (!informationsPersonnelles.email) {
            newErrors.email = true;
        }
        if (!informationsPersonnelles.telephone) {
            newErrors.telephone = true;
        }
        if (!informationsPersonnelles.numRue) {
            newErrors.numRue = true;
        }
        if (!informationsPersonnelles.adresse) {
            newErrors.adresse = true;
        }
        if (!informationsPersonnelles.codePostal) {
            newErrors.codePostal = true;
        }
        if (!informationsPersonnelles.ville) {
            newErrors.ville = true;
        }
        if (!informationsPersonnelles.pays) {
            newErrors.pays = true;
        }
        if (!informationsPersonnelles.numPermis) {
            newErrors.numPermis = true;
        }
        if (!informationsPersonnelles.datePermis) {
            newErrors.datePermis = true;
        }
        if (!informationsPersonnelles.paysPermis) {
            newErrors.paysPermis = true;
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validateFields()) {
            onFormSubmit(informationsPersonnelles);
        }
    };


    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Étape 1: Informations Personnelles</h2>
            <div className="space-y-4">
                <div>
                    <label htmlFor="genre" className="block mb-1">Genre :</label>
                    <select
                        id="genre"
                        value={informationsPersonnelles.genre}
                        onChange={handleChange}
                        className={`border rounded-md px-4 py-2 w-full ${errors.genre ? 'border-red-500' : 'border-gray-300'}`}
                        required={true}
                    >
                        <option value="">Sélectionnez</option>
                        <option value="M">Masculin</option>
                        <option value="F">Féminin</option>
                    </select>
                    {errors.genre && <span className="text-red-500 text-sm">Ce champ est obligatoire</span>}
                </div>

                <InputForm
                    htmlFor="nom"
                    label="Nom :"
                    type="text"
                    id="nom"
                    placeholder="Nom"
                    value={informationsPersonnelles.nom}
                    required={true}
                    onChange={handleChange}
                    className={`border rounded-md px-4 py-2 w-full ${errors.nom ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.nom && <span className="text-red-500 text-sm">Ce champ est obligatoire</span>}

                <InputForm
                    htmlFor="prenom"
                    label="Prénom :"
                    type="text"
                    id="prenom"
                    placeholder="Prénom"
                    value={informationsPersonnelles.prenom}
                    required={true}
                    onChange={handleChange}
                    className={`border rounded-md px-4 py-2 w-full ${errors.prenom ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.prenom && <span className="text-red-500 text-sm">Ce champ est obligatoire</span>}

                <InputForm
                    htmlFor="dateNaissance"
                    label="Date de Naissance :"
                    type="date"
                    id="dateNaissance"
                    placeholder="Date de Naissance"
                    value={informationsPersonnelles.dateNaissance || ''}
                    disabled={true}
                    onChange={handleChange}
                    className={`border rounded-md px-4 py-2 w-full border-gray-600'}`}
                />
                {/* {errors.dateNaissance && <span className="text-red-500 text-sm">Ce champ est obligatoire</span>} */}

                <InputForm
                    htmlFor="email"
                    label="Email :"
                    type="email"
                    id="email"
                    placeholder="Email"
                    value={informationsPersonnelles.email}
                    required={true}
                    onChange={handleChange}
                    className={`border rounded-md px-4 py-2 w-full ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                />

                <InputForm
                    htmlFor="telephone"
                    label="Numéro de téléphone :"
                    type="tel"
                    id="telephone"
                    placeholder="Numéro de téléphone"
                    value={informationsPersonnelles.telephone}
                    required={true}
                    onChange={handleChange}
                    className={`border rounded-md px-4 py-2 w-full ${errors.telephone ? 'border-red-500' : 'border-gray-300'}`}
                />

                <InputForm
                    htmlFor="numRue"
                    label="Numéro de rue :"
                    type="number"
                    id="numRue"
                    placeholder="Numéro de rue"
                    value={informationsPersonnelles.numRue}
                    required={true}
                    onChange={handleChange}
                    className={`border rounded-md px-4 py-2 w-full ${errors.numRue ? 'border-red-500' : 'border-gray-300'}`}
                />

                <InputForm
                    htmlFor="adresse"
                    label="Adresse :"
                    type="text"
                    id="adresse"
                    placeholder="Adresse"
                    value={informationsPersonnelles.adresse}
                    required={true}
                    onChange={handleChange}
                    className={`border rounded-md px-4 py-2 w-full ${errors.adresse ? 'border-red-500' : 'border-gray-300'}`}
                />

                <InputForm
                    htmlFor="codePostal"
                    label="Code Postal :"
                    type="text"
                    id="codePostal"
                    placeholder="Code Postal"
                    value={informationsPersonnelles.codePostal}
                    required={true}
                    onChange={handleChange}
                    className={`border rounded-md px-4 py-2 w-full ${errors.codePostal ? 'border-red-500' : 'border-gray-300'}`}
                />

                <InputForm
                    htmlFor="ville"
                    label="Ville :"
                    type="text"
                    id="ville"
                    placeholder="Ville"
                    value={informationsPersonnelles.ville}
                    required={true}
                    onChange={handleChange}
                    className={`border rounded-md px-4 py-2 w-full ${errors.ville ? 'border-red-500' : 'border-gray-300'}`}
                />

                <FormPays
                    htmlFor="pays"
                    label="Pays :"
                    id="pays"
                    defaut={"Sélectionnez un pays"}
                    value={informationsPersonnelles.pays}
                    required={true}
                    onChange={handlePaysChange}
                    className={`border rounded-md px-4 py-2 w-full ${errors.pays ? 'border-red-500' : 'border-gray-300'}`}
                />

                <InputForm
                    htmlFor="numPermis"
                    label="Numéro de permis :"
                    type="int"
                    id="numPermis"
                    placeholder="Numéro de permis"
                    value={informationsPersonnelles.numPermis}
                    required={true}
                    onChange={handleChange}
                    className={`border rounded-md px-4 py-2 w-full ${errors.numPermis ? 'border-red-500' : 'border-gray-300'}`}
                />

                <InputForm
                    htmlFor="datePermis"
                    label="Date de permis :"
                    type="date"
                    id="datePermis"
                    value={informationsPersonnelles.datePermis}
                    required={true}
                    onChange={handleChange}
                    className={`border rounded-md px-4 py-2 w-full ${errors.datePermis ? 'border-red-500' : 'border-gray-300'}`}
                />

                <FormPays
                    htmlFor="paysPermis"
                    label="Pays du Permis de Conduire :"
                    id="paysPermis"
                    value={informationsPersonnelles.paysPermis}
                    defaut={"Sélectionnez un pays"}
                    required={true}
                    onChange={handlepaysPermisChange}
                    className={`border rounded-md px-4 py-2 w-full ${errors.paysPermis ? 'border-red-500' : 'border-gray-300'}`}
                />

            </div>
            <div className="flex justify-between mt-4">
                <a href={`/produit/${selectProd}`} className="bg-red-500 text-white py-2 px-4 rounded-md">
                    Retour
                </a>
                <button
                    onClick={handleSubmit}
                    className={`bg-blue-500 text-white py-2 px-4 rounded-md ${Object.keys(errors).length > 0 ? 'cursor-not-allowed' : ''}`}
                >
                    Suivant
                </button>
            </div>
        </div>
    );
};

export default FormInfoPerso;
