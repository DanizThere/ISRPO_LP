import { useState } from "react";
import AuthPrefab from "../../components/AuthPrefab";
import { UserAPI } from "../../API/UserAPI";

export default function Reg(){
    const [isShowPassword, setShowPassword] = useState(false)
    const [phone, setPhone] = useState("")

    function setPhoneNumber(event){
        const val = event.target.value
                        
        if(!isNaN(val)){
            setPhone(val)
        }
    }

    function checkPhoneNumber(){
        if(phone.length != 11) throw new Error("Длина телефона больше/меньше 11, проверьте написание номера")
    }

    async function createUser(){
        const result = await UserAPI.create()
    }

    return(     
        <>
            <AuthPrefab customEvent={checkPhoneNumber} name={"Регистрация"} isLogin={false}>
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
                        <option value="Мастер">Мастером</option>
                    </select>
                </label>
            </AuthPrefab>
        </>
    )
}