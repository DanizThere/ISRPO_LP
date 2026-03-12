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

    get: async (id, token) => {
        const data = await FetchData(`request/get/${id}`, {
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
    },

    update: async (request, token) => {
        await FetchData("request/update", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(request),
            credentials: 'include'
        })
    },

    setMaster: async (requestId, masterId, token) => {
        await FetchData(`request/setMaster?requestId=${requestId}&masterId=${masterId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            credentials: 'include'
        })
    },

    setStatus: async (requestId, status, token) => {
        await FetchData(`request/setStatus?requestId=${requestId}&status=${status}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            credentials: 'include'
        })
    }
}