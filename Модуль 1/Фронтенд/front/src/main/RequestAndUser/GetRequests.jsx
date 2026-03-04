import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RequestCard from "../../components/RequestCard";
import Header from "../../components/Header";

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
            const user = JSON.parse(localStorage.getItem("user"))
            if(user) {
                setUserData(user)

                var requests = await selectRequests(userData.type, requestStatusSearch)
            }

        }
        catch (error){
            setLoading(false);
        }

        setLoading(true)
    }

    async function selectRequests(type, num){
        try{
            const data = await requestAPI.GetAll(type, num)
            if(data) setRequestData(data)
        } catch(error)
        {

        }
    }

    useEffect(() => {
        getData()

    },[])

    return(
        <>
        <Header pageName={"Личный кабинет"}/>

        {!loading ? <>
            <h1>Идет загрузка</h1>
            </> : requestData.map(r => <RequestCard request={r}/>)}
            
        </>
    )
}