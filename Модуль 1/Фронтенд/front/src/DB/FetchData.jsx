import { ServerAddress } from "./ConstData.jsx";

export async function FetchData(url, options = {}){
    try{
        const data = await fetch(`${ServerAddress}/${url}`, options)

        if(!data.ok) throw new Error(data.status);

        return data.json();
    } 
    catch (error){
        throw(`Произошла ошибка: ${error}, просим прощения за такое`)
    }
}

export async function FetchDataString(url, options = {}){
    try{
        const data = await fetch(`${ServerAddress}/${url}`, options)

        if(!data.ok) throw new Error(data.status);

        return data;
    } 
    catch (error){
        throw(`Произошла ошибка: ${error}, просим прощения за такое`)
    }
}