import { FetchData } from "../DB/FetchData"

export const RequestAPI = {
    getAll: async (token) => {
        const data = await FetchData("request/get", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            credentials: 'include'
        })

        return data
    },

    create: async (request, token) => {
        await FetchData("request/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(request),
            credentials: 'include'
        })
    }
}