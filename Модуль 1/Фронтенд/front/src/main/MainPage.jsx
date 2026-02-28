import Button from "../components/Button";
import Container from "../components/Containter";
import Header from "../components/Header";

export default function Main(){

    return(
        <>
            <Header/>
            
            <Container>
                <h1 className="title">БытСервис</h1> 
                <i>Обработка заявок - высший класс!</i>

                <div className="options">
                    <Button>Создать заявку на ремонт</Button>
                    <Button>Просмотреть заявки на ремонт</Button>
                </div>
            </Container>
        </>
    )
}