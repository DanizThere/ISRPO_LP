import { jwtDecode } from "jwt-decode";
import Container from "../../components/Containter";
import Header from "../../components/Header";
import Cookies from "js-cookie";
import { RequestAPI } from "../../API/RequestAPI";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/Button";
import moment from "moment"
import { DecodedToken, NewRequestStatus, Token } from "../../DB/ConstData";
import "../../css/createRequestStyle.css"
import { useEffect, useState } from "react";

export default function UpdateRequest(){
    const [requestData, setRequestData] = useState([])
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        async function getData() {
            const token = await Token()
            const request = await RequestAPI.get(id, token)
            setRequestData(request)
        }

        getData()
    },[])

    async function handleSubmit(event){
        event.preventDefault()

        try{
            const token = await Token()
            const data = new FormData(event.target)

            data.append("requeststatus", requestData.requeststatus)
            data.append("startdate", requestData.startdate)
            data.append("clientid", requestData.clientid)
            data.append("requestid", requestData.requestid)

            const obj = Object.fromEntries(data.entries())
            
            await RequestAPI.update(obj, token)

            navigate(-1)
        }catch(error){
            alert(`Произошла ошибка: ${error}`)
        }
    }

    return(
        <>
        <Header pageName={"Редактирование заявки"}/>

        <Container>
            <div>
                <form onSubmit={handleSubmit} className="createRequest">
                    <label>
                        Введите название техники
                        <input type="text" name="hometechtype" required placeholder="Фен" defaultValue={requestData.hometechtype}></input>
                    </label>
                    <label>
                        Введите название модели вашей техники
                        <input type="text" name="hometechmodel" required placeholder="Ладомир ТА112 белый" defaultValue={requestData.hometechmodel}></input>
                    </label>
                    <label>
                        Опишите вашу проблему
                        <textarea type="text" name="problemdescryption" required placeholder="Не включается" defaultValue={requestData.problemdescryption}></textarea>
                    </label>
                    <Button type={"submit"} className={"submit"}>Обновить</Button>
                    <Button className={"return"} onClick={() => navigate(-1)}>Обратно</Button>
                </form>
            </div>
        </Container>
        </>
    )
}