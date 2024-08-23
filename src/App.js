import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Accueil from './views/blog/accueil';
import Produit from './views/blog/produit';
import Prix from './views/blog/produits';
import Contact from './views/blog/contact';
import FAQ from './views/blog/faq';
import Formulaire from './views/blog/formulaire';
import Connexion from './views/blog/connexion';
import CreaCompte from './views/blog/creacompte';
import Compte from './views/blog/compte';
import Contrats from './views/blog/contrats';
import Footer from './components/footer';
import Header from './components/header';
import Paiement from './views/blog/paiement';
import Admin from './views/blog/admin';


const App = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Router>
                <Header />
                <div className="flex-grow">
                    <Routes>
                        <Route exact path="/" element={<Accueil />} />
                        <Route path="/produit/:id" element={<Produit />} />
                        <Route path="/produit" element={<Prix />} />
                        <Route path="/produits" element={<Prix />} />
                        <Route path="/produits/:id" element={<Prix />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/faq" element={<FAQ />} />
                        <Route path="/connexion" element={<Connexion />} />
                        <Route path="/creacompte" element={<CreaCompte />} />
                        <Route path="/compte" element={<Compte />} />
                        <Route path="/contrats" element={<Contrats />} />
                        <Route path="/formulaire/:id" element={<Formulaire />} />
                        <Route path="/formulaire" element={<Formulaire />} />
                        <Route path="/paiement" element={<Paiement />} />
                        <Route path="/admin" element={<Admin />} />
                    </Routes>
                </div>
                <Footer />
            </Router>
        </div>
    );
};




export default App;
