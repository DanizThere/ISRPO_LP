import Cookies from "js-cookie"
import { jwtDecode } from "jwt-decode"

export const ServerAddress = "https://localhost:7124/api"

export const NewRequestStatus = "Новая заявка"
export const InProgressRequestStatus = "В процессе ремонта"
export const ReadyRequestStatus = "Готова к выдаче"

export const userRole = "Заказчик"
export const managerRole = "Менеджер"
export const operatorRole = "Оператор"
export const masterRole = "Мастер"
export const adminRole = "Админ"

export const Token = async () => {
    const t = Cookies.get("cookie")

    return t;
}
export const DecodedToken = async () => {
    const token = await Token()

    return jwtDecode(token)
}