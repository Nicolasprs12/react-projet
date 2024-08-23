import React from 'react';
import { useNavigate } from 'react-router-dom';

const PayerContrat = ({ idContrat }) => {
  const navigate = useNavigate();

  const payerForm = (idContrat) => {
    navigate("/paiement", { state: { idContrat } });
  };

    return (
      <button onClick={() => payerForm(idContrat)}
      className="ml-2 text-blue-600"
        style={{ padding: '10px' }}
      >
        Payer
      </button>
    );

};
  export default PayerContrat;
