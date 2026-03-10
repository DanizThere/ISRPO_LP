import { jwtDecode } from "jwt-decode";
import Container from "../../components/Containter";
import Header from "../../components/Header";
import Cookies from "js-cookie";
import { RequestAPI } from "../../API/RequestAPI";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import moment from "moment"
import { DecodedToken, NewRequestStatus, Token } from "../../DB/ConstData";
import "../../css/createRequestStyle.css"

export default function CreateRequest(){
    const navigate = useNavigate()

    async function handleSubmit(event){
        event.preventDefault()

        try{
            const token = await Token()
            const user = await DecodedToken()
            const data = new FormData(event.target)

            data.append("requeststatus", NewRequestStatus)
            data.append("startdate", moment().format("YYYY-MM-DD"))
            data.append("clientid", user.userId)

            const obj = Object.fromEntries(data.entries())
            
            await RequestAPI.create(obj, token)

            navigate(-1)
        }catch(error){
            alert(`Произошла ошибка: ${error}`)
        }
    }

    return(
        <>
        <Header pageName={"Создание заявки"}/>

        <Container>
            <div>
                <form onSubmit={handleSubmit} className="createRequest">
                    <label>
                        Введите название техники
                        <input type="text" name="hometechtype" required placeholder="Фен"></input>
                    </label>
                    <label>
                        Введите название модели вашей техники
                        <input type="text" name="hometechmodel" required placeholder="Ладомир ТА112 белый"></input>
                    </label>
                    <label>
                        Опишите вашу проблему
                        <textarea type="text" name="problemdescryption" required placeholder="Не включается"></textarea>
                    </label>
                    <Button type={"submit"} className={"submit"}>Создать заявку</Button>
                    <Button className={"return"} onClick={() => navigate(-1)}>Обратно</Button>
                </form>
            </div>
        </Container>
        </>
    )
}