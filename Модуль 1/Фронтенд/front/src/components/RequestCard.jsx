import { useNavigate } from "react-router-dom"
import "../css/requestCardStyle.css"
import Button from "./Button"

export default function RequestCard({request, key, onClick}){
    const navigate = useNavigate()
    
    return(
        <>
            <div className="request" key={key} onClick={onClick}>
                <h3 className="requestDate">{request.startdate}</h3>
                <p className="requestTech">{request.hometechtype}:{request.hometechmodel}</p>

                <p className="requestDesc">{request.problemdescription}</p>
                <p className="requestStatus">{request.requeststatus}</p>
                <Button onClick={() => navigate(`comms/${key}`)}>Просмотреть комментарии</Button>
            </div>
        </>
    )
}