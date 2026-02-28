import { useState } from "react"
import Button from "./Button";

export default function Header(){
    const [userData, setUserData] = useState([])

    const isAuth = userData !== undefined;

    return(
        <>
        <header className="header">
            <div className="mainBtn">Главная страница</div>
            {!isAuth ? <div className="auth">
                <Button>В личный кабинет</Button>
            </div> : <div className="noAuth">
                <Button className="authBtn">Авторизация</Button>
                <Button className="authBtn">Регистрация</Button>
                </div>}
        </header>
        </>
    )
}