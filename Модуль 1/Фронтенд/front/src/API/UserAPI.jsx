import { FetchData, FetchDataString } from "../DB/FetchData";

export const UserAPI = {
    login: async (request) => {
        const data = await FetchDataString("user/login", {
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(request)
        }) 

        return data
    },

    reg: async (request) => {
        const data = await FetchDataString("user/reg", {
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(request)
        }) 

        return data
    },

    get: async (id) => {
        const data = await FetchData(`user/get/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            } 
        })

        return data
    },

    getMasters: async () => {
        const data = await FetchData(`user/get/master`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            } 
        })

        return data
    }
}