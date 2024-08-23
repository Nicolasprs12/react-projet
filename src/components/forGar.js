import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const GarantieComponent = () => {
  const { id } = useParams();
  console.log(id);
  const [garanties, setGaranties] = useState([]);
  const [selectedDuree, setSelectedDuree] = useState("");
  const [selectedTypeContrat, setSelectedTypeContrat] = useState("");
  const [prix, setPrix] = useState("");


  const pdcDuree = id.split('-')[0];
  const pdcContrat = id.split('-')[1]

  useEffect(() => {
    const fetchGaranties = async () => {
      try {
        const response = await fetch('http://localhost/Assu_Camping2/prix');
        if (!response.ok) {
          throw new Error('Failed to fetch garanties');
        }
        const data = await response.json();
        const selectProd = data.find(prod => prod.Duree.toString() === pdcDuree && (prod.typeContrat === pdcContrat));
        setGaranties(selectProd);
      } catch (error) {
        console.error('Error fetching garanties:', error);
      }
    };

    fetchGaranties();
  }, [pdcContrat, pdcDuree]);

  useEffect(() => {
    // Réinitialiser la durée sélectionnée lorsque le type de contrat change
    setSelectedDuree("");

    // Réinitialiser le prix lors du changement du type de contrat
    setPrix("");
  }, [selectedTypeContrat]);

  const handleDureeChange = (event) => {
    setSelectedDuree(event.target.value);
    const selectedGarantie = garanties.find(garantie => garantie.Duree === parseInt(event.target.value) && garantie.typeContrat === selectedTypeContrat);
    if (selectedGarantie) {
      setPrix(selectedGarantie.Prix);
    } else {
      setPrix("");
    }
  };

  const handleTypeContratChange = (event) => {
    setSelectedTypeContrat(event.target.value);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Étape 3: Garantie</h2>
      <div>
        <label htmlFor="typeContrat">Type de contrat:</label>
        <div>
          <input type="radio" id="standard" name="typeContrat" value="Standard" checked={selectedTypeContrat === "Standard"} onChange={handleTypeContratChange} />
          <label htmlFor="standard">Standard</label>
          <input type="radio" id="23CV" name="typeContrat" value="23CV" checked={selectedTypeContrat === "23CV"} onChange={handleTypeContratChange} />
          <label htmlFor="23CV">23CV</label>
        </div>
      </div>
      <div>
        <label htmlFor="duree">Durée:</label>
        <select id="duree" value={selectedDuree} onChange={handleDureeChange}>
          <option value="">Sélectionner une durée</option>
          {garanties.filter(garantie => garantie.typeContrat === selectedTypeContrat).map(garantie => (
            <option key={garantie.idPrixVente} value={garantie.Duree}>{garantie.Duree}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="prix">Prix:</label>
        <input id="prix" type="text" value={prix} readOnly />
      </div>
    </div>
  );
};

export default GarantieComponent;
