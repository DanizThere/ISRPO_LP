import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Container from "../components/Containter";

export default function ErrorPage(){
    const navigate = useNavigate()
    return(
        <>
            <Container>
                <h3>Данной страницы не существует</h3>
                <h4>Ошибка 404</h4>

                <Button onClick={() => navigate(-1)}>Вернуться на предыдущую страницу</Button>
            </Container>
        </>
    )
}