import { useState } from "react";
import Container from "./Containter";
import Header from "./Header";
import Button from "./Button";
import { UserAPI } from "../API/UserAPI";
import { useNavigate } from "react-router-dom";
import "../css/authStyle.css"

export default function AuthPrefab({customEvent, name, children, isLogin = false}){
    const [error, setError] = useState("")
    const navigate = useNavigate()

    function submitData(event){
        event.preventDefault()

        try{
            const form = event.target;
            const formData = new FormData(form)

            customEvent()
            
            if(isLogin){
                const result = UserAPI.login(formData)
                if(result){
                    navigate("/request")
                }
            }else{
                const result = UserAPI.create(formData)
                if(result){
                    const loginResult = UserAPI.login(formData)
                    if(loginResult){
                        navigate("/request")
                    }  
                }
            }

            
        } catch (error){
            setError(`Произошла ошибка: ${error}. Повторите заново через какое-то время`)
        }
    }

    return(
        <>
            <Header pageName={name}/>

            <Container>
                <p className="authErrorTitle">{error}</p>

                <form className="authForm" onSubmit={submitData}>
                    {children}

                    <div className="authButton">
                        <Button className={"submit"} type={"submit"}>Продолжить</Button>
                    </div>
                </form>

                
            </Container>
        </>
    )
}