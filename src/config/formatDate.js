export const formatDate = (date) => {
    // Vérifiez si la date est un objet Date
    if (date instanceof Date) {
        // Obtenez l'année, le mois et le jour
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        // Retournez la date formatée
        return `${year}-${month}-${day}`;
    } else {
        // Si ce n'est pas un objet Date, retournez la date telle quelle
        return date;
    }
};

export const formatDetH = (dateString) => {
    const dateParts = dateString.split(" ");
    const date = dateParts[0].split("-");
    const time = dateParts[1].split(":");
    
    const day = date[2];
    const month = date[1];
    const year = date[0];
    
    const hour = time[0];
    const minute = time[1];
    
    return `${day}-${month}-${year} ${hour}:${minute}`;
};


