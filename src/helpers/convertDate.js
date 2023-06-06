const convertDate = (time) => {
    
    
    const converTime = new Date(time).toLocaleDateString('es-cl', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const convertHour = new Date(time).toLocaleTimeString('es-cl');
    
    return {
        converTime,
        convertHour,
    }
};

export default convertDate;