import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Button from "../../components/Button";
import Container from "../../components/Containter";
import { UserAPI } from "../../API/UserAPI";

export default function Auth(){
    const [isShowPassword, setShowPassword] = useState(false)
    const [error, setError] = useState("")
    const navigate = useNavigate()

    async function submitData(event){
        event.preventDefault()

        try{
            const formData = Object.fromEntries(new FormData(event.target).entries())
            await UserAPI.login(formData)
                .then(function nav(){
                    navigate("/request")
                })  
        } catch (error){
            setError(`Произошла ошибка: ${error}. Повторите заново через какое-то время`)
        }
    }

    return(
        <>

        <Header pageName={"Авторизация"}/>
        <Container>
            <p className="authErrorTitle">{error}</p>

            <form className="authForm" onSubmit={submitData}>
            <label>
                    Логин:
                </label>
                <input type="text" id="authInput" name="login" required/>

                <label>
                    Пароль:
                </label>
                <input type={isShowPassword ? "text" : "password"} id="authInput" name="password" required/>

                <label>
                    Показывать пароль?
                    <input type="checkbox" id="authInput" onChange={(e) => setShowPassword(e.target.checked)}/>
                </label>

                <div className="authButton">
                    <Button className={"submit"} type={"submit"}>Продолжить</Button>
                </div>
            </form>          
        </Container>

        
        </>
    )
}