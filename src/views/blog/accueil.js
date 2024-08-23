import React from 'react';
import ProductList from '../../components/cardProd';

class Accueil extends React.Component {
  render() {
    return (
      <div>
        {/* Bannière */}
        <div className="bg-gray-200 p-4 lg:p-8">
          <h2 className="text-lg lg:text-2xl font-bold text-center">Bienvenue sur notre site</h2>
          <p className="text-sm lg:text-lg text-center mt-2 lg:mt-4">Découvrez nos produits de haute qualité</p>
        </div>

        {/* Conteneur des zones de texte et des cartes */}
        <div className="max-w-screen-xl mx-auto py-4 lg:py-8 px-2 lg:px-4" style={{ width: '90%' }}>
          {/* 4 blocs de présentation */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-8 max-w-screen-xl mx-auto pb-2 lg:pb-4">
            <div className="bg-white shadow-lg rounded-lg p-4 lg:p-6">
              <h3 className="text-base lg:text-lg font-semibold mb-2 lg:mb-4">Assurance pas chère</h3>
              <p className="text-sm lg:text-base font-normal">A partir de 3,50 € par jour, nous vous proposons les assurances temporaires les moins chères du marché.</p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-4 lg:p-6">
              <h3 className="text-base lg:text-lg font-semibold mb-2 lg:mb-4">Assurance courte durée</h3>
              <p className="text-sm lg:text-base font-normal">Assurance temporaire provisoire et immédiate de 1 à 90 jours suivant le type de véhicule et sa puissance.</p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-4 lg:p-6">
              <h3 className="text-base lg:text-lg font-semibold mb-2 lg:mb-4">Simple et rapide</h3>
              <p className="text-sm lg:text-base">Disposez de votre carte verte, en quelques minutes, après avoir renseigné un simple formulaire de souscription.</p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-4 lg:p-6">
              <h3 className="text-base lg:text-lg font-semibold mb-2 lg:mb-4">Paiement en ligne</h3>
              <p className="text-sm lg:text-base">Vous réglez par carte bancaire puis vous téléchargez votre attestation sur votre compte ou la recevez sur votre boite mail.</p>
            </div>
          </div>

          <div className="flex text-lg lg:text-2xl justify-center font-bold pt-2">
            Nos produits
          </div>
          {/* Cartes de présentation des produits */}
          <div>
          <ProductList displayOnly={[0, 3, 9]} />
          </div>
          <div className="text-right">
            <a href="/produits" className="text-blue-700 dark:text-blue-500 hover:underline">Plus de produits →</a>
          </div>
        </div>

        {/* Lien "Plus de produits" */}
        <div className="max-w-screen-xl mx-auto py-2 md:py-2 px-2 md:px-4">
        </div>

        {/* Affichage du blog */}
        <div className="bg-gray-100 py-4 lg:py-8">
          <div className="max-w-screen-xl mx-auto px-2 lg:px-4">
            <h2 className="text-lg lg:text-2xl font-bold mb-2 lg:mb-4">Derniers articles de blog</h2>
            {/* Ici, vous pouvez inclure votre composant d'affichage du blog */}
          </div>
        </div>
      </div>
    );
  }
}

export default Accueil;
