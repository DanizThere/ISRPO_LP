import { FetchData } from "../DB/FetchData"

export const RequestAPI = {
    getAll: async (token) => {
        const data = await FetchData("request/get", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }) 

        return data
    },
}