import React from 'react';

const JourRegle = ({ jour }) => {
    // Fonction pour déterminer si le mot "jour" doit être au pluriel ou au singulier
    const getJourRegle = (count) => {
        return count === 1 ? 'Jour' : 'Jours';
    };

    return (
        <span>
            {jour} {getJourRegle(jour)}
        </span>
    );
};

export default JourRegle;
