import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Container from "../components/Containter";
import Header from "../components/Header";
import { Token } from "../DB/ConstData";
import { useEffect, useState } from "react";
import { StatisticAPI } from "../API/StatisticAPI";

export default function Main(){
    const [medTime, setMedTime] = useState('')
    const navigate = useNavigate()

    async function checkAuth(path){
        const token = await Token()

        if(!token) {
            navigate("/auth")
            return
        }

        navigate(path)
    }

    useEffect(() => {
        async function getData(){
            const time = await StatisticAPI.getAverageTime();
            
            setMedTime(time)
        }

        getData()
    },[])

    return(
        <>
            <Header pageName="Главная"/>
            
            <Container>
                <h1 className="title">БытСервис</h1> 
                <i>Обработка заявок - высший класс!</i>

                <h5>{medTime}</h5>

                <div className="options">
                    <Button onClick={() => checkAuth("/request/create")}>Создать заявку на ремонт</Button>
                    <Button onClick={() => checkAuth("/request")}>Просмотреть заявки на ремонт</Button>
                </div>
            </Container>
        </>
    )
}