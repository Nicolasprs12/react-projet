import React, { useState, useEffect } from 'react';

const FormPays = ({ htmlFor, label, id, defaut, value, disabled, onChange }) => {
    const [paysListe, setPays] = useState([]);

    const handlePaysChange = (e) => {
        onChange(e.target.value);
    };

    useEffect(() => {
        const fetchPays = async () => {
            try {
                const response = await fetch('http://localhost/Assu_Camping2/pays');
                if (!response.ok) {
                    throw new Error('Failed to fetch countries');
                }
                const data = await response.json();
                setPays(data);
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };

        fetchPays();
    }, []);

    return (
        <div>
            <label htmlFor={htmlFor} className="block mb-1">{label}</label>
            <select
                id={id}
                value={value}
                onChange={handlePaysChange}
                disabled={disabled}
                className={`border rounded-md px-4 py-2 w-full ${disabled ? 'border-gray-600' : 'border-gray-300'}`}
            >
                <option value="" >{defaut}</option>
                {paysListe.map((paysItem) => (
                    <option key={paysItem.nom_fr_fr} value={paysItem.nom_fr_fr}>
                        {paysItem.nom_fr_fr}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default FormPays;
