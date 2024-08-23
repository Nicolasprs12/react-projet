import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SuppContrat = ({ idContrat }) => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSuppContrat = async (idContrat) => {
    const token = localStorage.getItem('sessionToken');
    if (!token) {
      navigate("/connexion");
      return;
    }

    try {
      const response = await fetch(`http://localhost/Assu_Camping2/contratDelete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ id: idContrat }) // Utilisez 'id' pour correspondre au backend
      });

      if (response.ok) {
        const result = await response.json();
        if (result.isSuccess) {
          alert('Le contrat a bien été effacé');
          window.location.reload();
        } else {
          setError(result.message || "Une erreur a eu lieu");
        }
      } else {
        setError("Une erreur a eu lieu");
      }
    } catch (error) {
      console.error(error);
      setError("Une erreur a eu lieu lors de la suppression de votre contrat");
    }
  };

  return (
    <>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button
        onClick={() => handleSuppContrat(idContrat)}
        className="ml-2 text-red-600"
        style={{ padding: '10px' }}
      >
        Supprimer
      </button>
    </>
  );
};

export default SuppContrat;
