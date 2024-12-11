export const getYearFromDate = (date: string) => {

    const dateObject = new Date(date);

    const year = dateObject.getFullYear();

    return year;
};
