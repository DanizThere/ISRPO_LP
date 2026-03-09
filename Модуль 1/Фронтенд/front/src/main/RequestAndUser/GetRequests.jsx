import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RequestCard from "../../components/RequestCard";
import Header from "../../components/Header";
import Cookies from "js-cookie"
import { UserAPI } from "../../API/UserAPI";
import {jwtDecode} from "jwt-decode"
import { RequestAPI } from "../../API/RequestAPI";

export default function GetRequests(){
    const [loading, setLoading] = useState(false)
    const [requestData, setRequestData] = useState([])
    const [userData, setUserData] = useState([])
    //0 - всё, 1 - новые, 2 - закрытые, 3 - текущие
    const [requestStatusSearch, setRequestStatusSearch] = useState(0)
    const navigate = useNavigate()

    async function getData(){
        try
        {
            const user = Cookies.get("cookie")
            if(!user) throw new Error("Пользователь не авторизован")
            const decoded = jwtDecode(user)

            const data = UserAPI.get(decoded.userId)
            if(data){
                setUserData(data)

                var requests = await RequestAPI.getAll(decoded)
                alert(requests)
                if(requests) setRequestData(requestData)
            }

        }
        catch (error){
            console.error(error)
            setLoading(false);
        }

        setLoading(true)
    }

    useEffect(() => {
        getData()

    },[])

    return(
        <>
        <Header pageName={"Личный кабинет"}/>

        {!loading ? <>
        </> : 
        <div>
            <h1>{userData.fio}</h1>
        </div>
        }

        {!loading ? <>
            <h1>Идет загрузка</h1>
            </> : requestData.map(r => <RequestCard request={r}/>)}
            
        </>
    )
}