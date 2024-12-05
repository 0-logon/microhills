export const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);

    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' }); // Ime meseca
    const year = date.getFullYear();

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    return `${month} ${day}, ${year} ${formattedTime}`;
};