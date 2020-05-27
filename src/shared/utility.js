export const updateObject = (olObject, updatedProperties) => {
    return {
        ...olObject,
        ...updatedProperties
    };
};