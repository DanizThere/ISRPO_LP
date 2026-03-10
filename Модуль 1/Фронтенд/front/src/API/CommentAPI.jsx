import { FetchData } from "../DB/FetchData";

export const CommentAPI = {
    create: async (request, token) => {
        const data = await FetchData("comment/add", {
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(request)
        }) 

        return data
    },

    get: async (id, token) => {
        const data = await FetchData(`comment/request/${id}`, {
            method: "GET",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            } 
        })

        return data
    }
}