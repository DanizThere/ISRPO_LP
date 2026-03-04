import { FetchData } from "../DB/FetchData";

export const UserAPI = {
    login: async (request) => {
        const data = await FetchData("user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(request)
        }) 

        return data
    },


}