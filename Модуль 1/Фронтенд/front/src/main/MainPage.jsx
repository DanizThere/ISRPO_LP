import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Container from "../components/Containter";
import Header from "../components/Header";
import { Token } from "../DB/ConstData";

export default function Main(){
    const navigate = useNavigate()

    async function checkAuth(path){
        const token = await Token()

        if(!token) {
            navigate("/auth")
            return
        }

        navigate(path)
    }

    return(
        <>
            <Header pageName="Главная"/>
            
            <Container>
                <h1 className="title">БытСервис</h1> 
                <i>Обработка заявок - высший класс!</i>

                <div className="options">
                    <Button onClick={() => checkAuth("/request/create")}>Создать заявку на ремонт</Button>
                    <Button onClick={() => checkAuth("/request")}>Просмотреть заявки на ремонт</Button>
                </div>
            </Container>
        </>
    )
}