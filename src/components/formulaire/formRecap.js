import React from 'react';

const FormRecap = ({ formValues }) => {
    const { informationsPersonnelles, informationsVehicule, informationsGarantie, documents } = formValues;
    
    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-4">Récapitulatif des Informations</h2>
            
            {/* Informations Personnelles */}
            <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Informations Personnelles</h3>
                <p><strong>Nom :</strong> {informationsPersonnelles.nom}</p>
                <p><strong>Prénom :</strong> {informationsPersonnelles.prenom}</p>
                <p><strong>Date de Naissance :</strong> {informationsPersonnelles.dateNaissance}</p>
                <p><strong>Email :</strong> {informationsPersonnelles.email}</p>
                <p><strong>Téléphone :</strong> {informationsPersonnelles.telephone}</p>
                <p><strong>Adresse :</strong> {informationsPersonnelles.numRue}, {informationsPersonnelles.adresse}, {informationsPersonnelles.codePostal}, {informationsPersonnelles.ville}, {informationsPersonnelles.pays}</p>
                <p><strong>Numéro de Permis :</strong> {informationsPersonnelles.numPermis}</p>
                <p><strong>Pays du Permis :</strong> {informationsPersonnelles.paysPermis}</p>
                <p><strong>Date de Permis :</strong> {informationsPersonnelles.datePermis}</p>
            </div>
            
            {/* Informations Véhicule */}
            <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Informations Véhicule</h3>
                <p><strong>Marque :</strong> {informationsVehicule.marque}</p>
                <p><strong>Modèle :</strong> {informationsVehicule.modele}</p>
                <p><strong>Immatriculation :</strong> {informationsVehicule.immatriculation}</p>
                <p><strong>Numéro d'Identification :</strong> {informationsVehicule.numIdentif}</p>
                <p><strong>Poids :</strong> {informationsVehicule.poids} tonnes</p>
                <p><strong>Nombre de Places :</strong> {informationsVehicule.nombrePlace}</p>
                <p><strong>Date de Mise en Circulation :</strong> {informationsVehicule.dateMEC}</p>
                <p><strong>Origine du Véhicule :</strong> {informationsVehicule.origVehi}</p>
            </div>
            
            {/* Garantie */}
            <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Garantie</h3>
                <p><strong>Type de Contrat :</strong> {informationsGarantie.selectedTypeContrat}</p>
                <p><strong>Durée :</strong> {informationsGarantie.selectedDuree} ans</p>
                <p><strong>Prix :</strong> {informationsGarantie.prix} €</p>
                <p><strong>Date de Début :</strong> {informationsGarantie.dateDebut}</p>
                <p><strong>Heure de Début :</strong> {informationsGarantie.heureDebut}</p>
            </div>
            
            {/* Documents */}
            <div>
                <h3 className="text-xl font-semibold mb-2">Documents</h3>
                <p><strong>Permis :</strong> {documents.permis}</p>
                <p><strong>Carte Grise :</strong> {documents.carteGrise}</p>
            </div>
        </div>
    );
};

export default FormRecap;
