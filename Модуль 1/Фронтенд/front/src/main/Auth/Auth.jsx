import { useState } from "react";
import AuthPrefab from "../../components/AuthPrefab";

export default function Auth(){
    const [isShowPassword, setShowPassword] = useState(false)

    return(
        <>
            <AuthPrefab name={"Авторизация"} isLogin={true}>
                <label>
                    Логин:
                    <input type="text" id="authInput" name="login" required/>
                </label>
                <label>
                    Пароль:
                    <input type={isShowPassword ? "text" : "password"} id="authInput" name="password" required/>
                </label>
                <label>
                    <input type="checkbox" id="authInput" onChange={(e) => setShowPassword(e.target.checked)}/>
                    Показывать пароль?
                </label>
            </AuthPrefab>
        </>
    )
}