import axios from "axios";

export const getCitiesByRegion = async (id: number) => {
    return (await axios.get(`${ process.env.API }/cities/region/${id}`)).data
}

export const getCities = async () => {
    return (await axios.get(`${ process.env.API }/cities`)).data
}

export const getCity = async (id: number) => {
    return (await axios.get(`${ process.env.API }/cities/${ id }`)).data
}

export const searchCity = async (search: string) => {
    return (await axios.get(`${ process.env.API }/cities/search/${ encodeURI(search) }`)).data
}
