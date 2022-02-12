export default {
    mapErrors(e, formErrors) {
        Object.keys(e.response.data.errors).forEach((key) => {
            Object.values(e.response.data.errors[key]).forEach((error) => {
                formErrors.push(error);
            });
        });
    },
};
