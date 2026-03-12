import { ServerAddress } from "../DB/ConstData";
import { FetchData, FetchDataString } from "../DB/FetchData";

export const StatisticAPI = {
    getSolvedRequests: async (token) => {
        const data = await FetchDataString("statistic/solvedRequests", {
            method: "GET",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }) 

        return data
    },

    getAverageTime: async () => {
        const data = await FetchDataString("statistic/averageTime", {
            method: "GET",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            }
        }) 

        return data
    },

    getInjuresStatistic: async (token) => {
        const data = await FetchData("statistic/injuresStatistic", {
            method: "GET",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }) 

        return data
    },

    getRequestStatistic: async (id, token) => {
        const data = await FetchDataString(`statistic/requestStatistic/${id}`, {
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