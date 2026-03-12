import { ServerAddress } from "./ConstData.jsx";

export async function FetchData(url, options = {}){
    try{
        const data = await fetch(`${ServerAddress}/${url}`, options)
        return await handleResponse(data);
    } 
    catch (error){
        throw(`Произошла ошибка: ${error}, просим прощения за такое`)
    }
}

export async function FetchDataString(url, options = {}){
    try{
        return await fetch(`${ServerAddress}/${url}`, options)
        .then(response => {
            if(!response.ok) throw new Error(`${response.status}`);

            return response.text()
        })
    } 
    catch (error){
        throw(`Произошла ошибка: ${error}, просим прощения за такое`)
    }
}
  
async function handleResponse(response){
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    return response.json();
  };