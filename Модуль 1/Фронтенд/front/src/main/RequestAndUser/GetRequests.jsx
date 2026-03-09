import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RequestCard from "../../components/RequestCard";
import Header from "../../components/Header";
import Cookies from "js-cookie";
import { UserAPI } from "../../API/UserAPI";
import { jwtDecode } from "jwt-decode";
import { RequestAPI } from "../../API/RequestAPI";
import Container from "../../components/Containter";

export default function GetRequests() {
    const [loading, setLoading] = useState(true);
    const [requestData, setRequestData] = useState([]);
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            try {
                const cookie = Cookies.get("cookie");
                if (!cookie) {
                    navigate("/auth");
                    return;
                }

                const decoded = jwtDecode(cookie);
                
                const user = await UserAPI.get(decoded.userId);
                setUserData(user);

                const requests = await RequestAPI.getAll(cookie);
                setRequestData(requests);
            } catch (error) {
                console.error("Ошибка загрузки:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [navigate]);

    if (loading) {
        return (
            <>
                <Header pageName={"Личный кабинет"} />
                <h1>Идёт загрузка...</h1>
            </>
        );
    }

    return (
        <>
            <Header pageName={"Личный кабинет"} />
            <Container>
                <div className="userName">
                    <h1>Здравствуйте, {userData?.fio}</h1>
                </div>
                <div>
                    <h3>Ваши заявки:</h3>
                </div>
                {requestData.length > 0 ? (
                    requestData.map((request) => <RequestCard key={request.id} request={request} />)
                ) : (
                    <p>Нет заявок для отображения</p>
                )}
            </Container>
        </>
    );
}