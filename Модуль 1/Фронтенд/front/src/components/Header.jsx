import { use, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Button from "./Button";
import { FetchData } from "../DB/FetchData";

export default function Header({pageName}){
    const [loading, setLoading] = useState(false)
    const [userData, setUserData] = useState([])
    const [isAuth, setAuth] = useState(false)
    const navigate = useNavigate()

    async function getData(){
        try
        {
            const id = JSON.parse(localStorage.getItem("user"))
            const user = await FetchData(`user/${id.userID}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if(user) setUserData(user)
        }
        catch (error){
            setAuth(false)
        }

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
                    <Button onClick={() => navigate(`/request/${userData.userID}`)}>В личный кабинет</Button>
                </div> : <div className="noAuth">
                    <Button className="authBtn" onClick={() => navigate("/auth")}>Авторизация</Button>
                    <Button className="authBtn" onClick={() => navigate("/reg")}>Регистрация</Button>
                    </div>}
            </header>
        }
        </>
    )
}