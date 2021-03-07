import axios from "axios";

export const getRegions = async () => {
    return (await axios.get(`${ process.env.API }/regions`)).data
}

export const getRegion = async (id: number) => {
    return (await axios.get(`${ process.env.API }/regions/${ id }`)).data
}