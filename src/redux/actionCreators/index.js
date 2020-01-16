export const getYears = () => ({
    type: 'GET_YEARS',
});

export const updateYears = () => ({
    type: 'UPDATE_YEARS',
});

export const getMakes = (year) => ({
    type: 'GET_MAKES', year: year
});

export const getModels = (year, make) => ({
    type: 'GET_MODELS', year: year, make: make
});

export const setYear = (year) => ({
    type: 'SET_YEAR', year: year
});

export const getVehicleDetails = (year, make, model) => ({
    type: 'GET_VEHICLE_DETAILS', year: year, make: make, model: model
});