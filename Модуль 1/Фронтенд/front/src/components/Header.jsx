import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Button from "./Button";
import { FetchData } from "../DB/FetchData";
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'
import { UserAPI } from "../API/UserAPI";

export default function Header({pageName}){
    const [loading, setLoading] = useState(false)
    const [userData, setUserData] = useState(null)
    const [isAuth, setAuth] = useState(false)

    const navigate = useNavigate()

    async function getData(){
        try
        {
            const token = Cookies.get("cookie")
            if(!token) throw new Error("Пользователь не авторизован")
            const decoded = jwtDecode(token)

            if(decoded) setUserData(decoded)
        }
        catch (error){
            console.error(error)
            setAuth(false)
            setLoading(true)
            return
        }
        setAuth(true)
        setLoading(true)
    }

    useEffect(() => {
        getData()
    },[])

    return(
        <>
        {!loading ? <>
            <h1>Идет загрузка</h1>
            </> :

            <header className="header">
                <Button className="mainBtn" onClick={() => {navigate("/")}}>Главная страница</Button>
                <h2>{pageName}</h2>

                {isAuth ? <div className="auth">
                    <Button onClick={() => navigate(`/request`)}>В личный кабинет</Button>
                </div> : <div className="noAuth">
                    <Button className="authBtn" onClick={() => navigate("/auth")}>Авторизация</Button>
                    <Button className="authBtn" onClick={() => navigate("/reg")}>Регистрация</Button>
                    </div>}
            </header>
        }
        </>
    )
}