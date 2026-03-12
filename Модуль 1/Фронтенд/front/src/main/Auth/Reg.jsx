import { useState } from "react";
import { UserAPI } from "../../API/UserAPI";
import Header from "../../components/Header";
import "../../css/authStyle.css"
import Container from "../../components/Containter";
import Button from "../../components/Button";


export default function Reg(){
    const [isShowPassword, setShowPassword] = useState(false)
    const [error, setError] = useState("")
    const [phone, setPhone] = useState("")

    function setPhoneNumber(event){
        const val = event.target.value
                        
        if(!isNaN(val)){
            setPhone(val)
        }
    }

    async function submitData(event){
        event.preventDefault()

        checkPhoneNumber()

        try{
            const formData = Object.fromEntries(new FormData(event.target).entries())
            await UserAPI.reg(formData)

            navigate("/login")
        } catch (error){
            setError(`${error}. Повторите заново через какое-то время`)
        }
    }

    function checkPhoneNumber(){
        if(phone.length != 11) throw new Error("Длина телефона больше/меньше 11, проверьте написание номера")
    }

    return(     
        <>
            <Header pageName={"Регистрация"}/>

            <Container>
                <p className="authErrorTitle">{error}</p>
                <form onSubmit={submitData} className="authForm">

                    <label className="authInput">
                        ФИО:
                        <input type="text" name="FIO" required/>
                    </label>
                    <label className="authInput">
                        Номер телефона:
                        <input type="text" value={phone} name="phone" required placeholder="вводите только цифры, без знаков" onChange={setPhoneNumber}/>
                    </label>
                    <label className="authInput">
                        Логин:
                        <input type="text" name="login" required/>
                    </label>
                    <label className="authInput">
                        Пароль:
                        <input type={isShowPassword ? "text" : "password"} name="password" required/>
                    </label>
                    <label className="authInput">
                        <input type="checkbox" onChange={(e) => setShowPassword(e.target.checked)}/>
                        Показывать пароль?
                    </label>
                    <label className="authInput">
                        Вы являетесь:
                        <select className="authSelect" name="type">
                            <option value="Заказчик">Заказчиком</option>
                        </select>
                    </label>
                    <Button type={"submit"} className={"submit"}>Зарегистрироваться</Button>
                </form>

            </Container>
        </>
    )
}