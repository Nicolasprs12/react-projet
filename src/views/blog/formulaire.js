import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FormInfoVehi from '../../components/formulaire/formInfoVehi';
import FormGarantie from '../../components/formulaire/formGarantie';
import FormInfoPerso from '../../components/formulaire/formInfoPerso';
import FormDoc from '../../components/formulaire/formDoc';
import FormRecap from '../../components/formulaire/formRecap';

const FormulaireEtapes = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [etape, setEtape] = useState(1);
    const [selectProd, setSelectProd] = useState();
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    // const [idContrat, setIdContrat] = useState('')
    const [infoModal, setInfoModal] = useState({
        informationsPersonnelles: {},
        informationsVehicule: {},
    });
    const [formValues, setFormValues] = useState({
        informationsPersonnelles: {},
        informationsVehicule: {},
        informationsGarantie: {},
        documents: {},
    });

    useEffect(() => {
        const token = localStorage.getItem('sessionToken');
        if (token) {
            setUserLoggedIn(true);
        }
    }, []);

    useEffect(() => {
        if (location && location.state) {
            const { formData, id } = location.state;
            if (formData) setInfoModal(formData);
            if (id) setSelectProd(id);
        }
    }, [location]);

    const passerEtapeSuivante = () => {
        setEtape(etape + 1);
    };

    const passerEtapePrecedente = () => {
        setEtape(etape - 1);
    };

    // Submit Perso
    const handleSubmitPerso = (data) => {
        setFormValues({ ...formValues, informationsPersonnelles: data });
        passerEtapeSuivante();
    };

    // Submit Vehi avec Suivant/Precedent
    const handleSubmitVehi = (data) => {
        setFormValues({ ...formValues, informationsVehicule: data });
        passerEtapeSuivante();
    };

    const handleSubmitVehiPre = (data) => {
        setFormValues({ ...formValues, informationsVehicule: data });
        passerEtapePrecedente();
    };

    const handleSubmitGarantie = (data) => {
        setFormValues({ ...formValues, informationsGarantie: data });
        passerEtapeSuivante();
    };

    const handleSubmitGarantiePre = (data) => {
        setFormValues({ ...formValues, informationsGarantie: data });
        passerEtapePrecedente();
    };

    const handleFormDocSubmit = (data) => {
        setFormValues({ ...formValues, documents: data });
        passerEtapeSuivante();
    };

    const handleFormDocSubmitPre = (data) => {
        setFormValues({ ...formValues, documents: data });
        passerEtapePrecedente();
    };

    const payerForm = async () => {
        if (!userLoggedIn) {
            navigate("/connexion");
            alert('Vous devez vous connecter pour enregistrer un contrat');
            return;
        } else {
            try {
                const url_server = "http://localhost/Assu_Camping2/formulaire";
                const token = localStorage.getItem('sessionToken');
    
                const response = await fetch(url_server, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(formValues)
                });
    
                const responseData = await response.json();                
                console.log(responseData);
                const idContrat = responseData.contrat.idContrat;
                // setIdContrat(idContrat);
                navigate("/paiement", { state: { idContrat } });
    
            } catch (error) {
                console.log(error);
            }
        }
    };

    const enregistrerForm = async () => {
        if (!userLoggedIn) {
            navigate("/connexion");
            alert('Vous devez vous connecter pour payer un contrat')
            return;
        } else {
            try {
                const url_server = "http://localhost/Assu_Camping2/formulaire";
                const token = localStorage.getItem('sessionToken');

                const response = await fetch(url_server, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(formValues)
                });
                const responseData = await response.json();                
                console.log(responseData);
                // setIdContrat(responseData);
                navigate("/compte")
                
            } catch (error) {
                console.log(error);
            }
        };
    };

    const { informationsPersonnelles, informationsVehicule } = infoModal;

    return (
        <div className=" container mx-auto px-4 py-8 black">
            {!userLoggedIn && (
                <div className="bg-yellow-200 p-4 mb-4">
                    <p className="text-lg font-semibold">Information</p>
                    <p>Nous vous conseillons de vous connecter ou de créer un compte avant de commencer à remplir ce formulaire ! Créer un compte ne vous prendra que 30 secondes et vous simplifiera la suite de la procédure.</p>
                    <button className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-md mr-2" onClick={() => navigate("/connexion")}>Se connecter</button>
                    <button className="mt-2 bg-green-500 text-white py-2 px-4 rounded-md" onClick={() => navigate("/creacompte")}>Créer un compte</button>
                </div>
            )}
            {etape === 1 && informationsPersonnelles.dateNaissance && (
                <div>
                    <FormInfoPerso
                        dateNaissance={informationsPersonnelles.dateNaissance}
                        selectProd={selectProd}
                        formValues={formValues.informationsPersonnelles}
                        onFormSubmit={handleSubmitPerso}
                    />
                </div>
            )}
            {etape === 2 && (
                <div>
                    <FormInfoVehi
                        poids={informationsVehicule.poids}
                        origVehi={informationsVehicule.origVehi}
                        formValues={formValues.informationsVehicule}
                        onFormSubmit={handleSubmitVehi}
                        onFormSubmitPre={handleSubmitVehiPre}
                    />
                </div>
            )}
            {etape === 3 && (
                <div>
                    <FormGarantie
                        selectProd={selectProd}
                        onFormSubmit={handleSubmitGarantie}
                        onFormSubmitPre={handleSubmitGarantiePre}
                        formValues={formValues.informationsGarantie}
                    />
                </div>
            )}
            {etape === 4 && (
                <div>
                    <FormDoc
                        formValues={formValues.documents}
                        onFormSubmitPre={handleFormDocSubmitPre}
                        onFormSubmit={handleFormDocSubmit} />
                </div>
            )}
            {etape === 5 && (
                <div>
                    <FormRecap
                        formValues={formValues}
                    />
                    <button onClick={passerEtapePrecedente} className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md">
                        Retour
                    </button>
                    <button onClick={payerForm} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md">
                        Payer
                    </button>
                    <button onClick={enregistrerForm} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md">
                        Enregistrer
                    </button>
                </div>
            )}
        </div>
    );
};

export default FormulaireEtapes;
