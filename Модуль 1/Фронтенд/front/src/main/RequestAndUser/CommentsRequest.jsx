import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header";
import Container from "../../components/Containter";
import Comments from "../../components/Comments";
import { useEffect, useState } from "react";
import { DecodedToken, masterRole, Token } from "../../DB/ConstData";
import { CommentAPI } from "../../API/CommentAPI";
import Button from "../../components/Button";

export default function CommentsRequest(){
    const { id } = useParams()
    const navigate = useNavigate()
    const [role, setRole] = useState('')

    useEffect(() => {
        async function getData() {
            const user = await DecodedToken();

            setRole(user.userRole)
        }

        getData()
    },[])

    async function handleSubmit(event) {
        event.preventDefault()

        try{
            const formData = new FormData(event.target)
            const user = await DecodedToken()
            formData.append("masterid", user.userId)
            formData.append("requestid", id)

            const objectEntries = Object.fromEntries(formData.entries())

            await CommentAPI.create(objectEntries, await Token())
            window.location.reload()
        }
        catch(error){
            alert(error)
        }
    }

    return(<>
        <Header pageName={`Комментарии к заявке №${id}`}/>

        <Container className="comms">
            <div>
                <h2>Последние комментарии:</h2>
                <Button onClick={() => navigate("/request")}>Вернуться обратно</Button>
            </div>
            <div>
                <Comments id={id}/>

            </div>

            {
                role === masterRole ? (
                <>
                    <form className="masterForm" onSubmit={handleSubmit}>
                        <p>
                            Введите ваш комментарий
                        </p>
                        <textarea required name="message"></textarea>
                        <p><Button type={"submit"} className={"submit"}>Отправить сообщение</Button></p>
                    </form>
                </>) : (<></>)
            }
            
        </Container>
    </>)
}