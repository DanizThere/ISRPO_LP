import { ServerAddress } from "../ConstData";

export async function FetchData({params, options = {}}){
    try{
        const data = await fetch(`${ServerAddress}${params}`, options)

        if(!data.ok) throw new Error(data.status);

        return data.json();
    } 
    catch (error){
        throw(`Произошла ошибка: ${error}, просим прощения за такое`)
    }
}