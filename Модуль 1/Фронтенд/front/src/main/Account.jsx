import Container from "../components/Containter";
import Header from "../components/Header";

export default function Account(){

    return(
        <>
            <Header/>

            <Container>
                <div className="accName">
                    <p>Добро пожаловать, Хрен Иваныч</p>
                </div>
            </Container>
        </>
    )
}