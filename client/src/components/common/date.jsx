let months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const addLeadingZero = (number) => {
    return number < 10 ? `0${number}` : number;
};

export const getDay = (timestamp) => {
    let date = new Date(timestamp);

    return `${date.getDate()}/${months[date.getMonth()]}`
}

export const getFullDate = (timestamp) => {
    let date = new Date(timestamp);

    return `${addLeadingZero(date.getDate())}/${months[date.getMonth()]}/${date.getFullYear()}`
}