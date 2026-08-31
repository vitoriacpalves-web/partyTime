const FormatDateTime = (dateValue) => {
    if (dateValue === null || dateValue === undefined) {
        return "";
    }

    const date = new Date(dateValue);
    if (Number.isNaN(date.getTime())) {
        return "";
    }

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
};

export default FormatDateTime;