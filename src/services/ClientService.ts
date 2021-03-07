import axios from "axios";

export const getClients = async () => {
    return (await axios.get(`${ process.env.API }/clients`)).data
}

export const getClient = async (peer_id: number) => {
    return (await axios.get(`${ process.env.API }/clients/${ peer_id }`)).data
}

export const setClient = async (data: any) => {
    const client = await getClient(data.peer_id)
    if ( client ) {
        return (await axios.put(`${ process.env.API }/clients/${ data.peer_id }`, data)).data
    }
    else {
        return (await axios.post(`${ process.env.API }/clients`, data)).data
    }
}