import { useNavigate } from "react-router-dom"
import "../css/requestCardStyle.css"
import Button from "./Button"
import { useEffect, useState } from "react"
import { DecodedToken, InProgressRequestStatus, managerRole, masterRole, operatorRole, ReadyRequestStatus, Token, userRole } from "../DB/ConstData"
import { UserAPI } from "../API/UserAPI"
import { RequestAPI } from "../API/RequestAPI"
import { StatisticAPI } from "../API/StatisticAPI"

export default function RequestCard({request, onClick}){
    const [selectMaster, setSelectMaster] = useState("")
    const navigate = useNavigate()
    const [user, setUser] = useState([])
    const [masters, setMasters] = useState([])
    const [existMasterFIO, setExistMasterFIO] = useState('')
    const [requestStatistic, setRequestStatistic] = useState('')

    useEffect(() => {
        async function getData(){
            const token = await Token()
            const data = await DecodedToken()
            const mstrs = await UserAPI.getMasters()

            const rStat = await StatisticAPI.getRequestStatistic(request.requestid, token)
            
            if(request.masterid){
                const exist = await UserAPI.get(request.masterid)

                setExistMasterFIO(exist.fio)
            }
            setRequestStatistic(rStat)
            setMasters(mstrs)
            setUser(data)
        }

        getData()
    },[])
    
    async function select(id){
        const token = await Token()
        const parsed = parseInt(selectMaster)
        await RequestAPI.setMaster(id, parsed, token)

        window.location.reload();
    }

    async function selectStatus(id){
        const token = await Token()
        await RequestAPI.setStatus(id, selectMaster, token)
        
        window.location.reload();
    }

    function handleChange(event){
        setSelectMaster(event.target.value)
    }

    return(
        <>
            <div className="request" key={request.requestid} onClick={onClick}>
                <h3 className="requestDate">{request.startdate}</h3>
                <p className="requestTech">{request.hometechtype}:{request.hometechmodel}</p>

                <p className="requestDesc">{request.problemdescryption}</p>
                <p className="requestStatus">Статус: <strong>{request.requeststatus}</strong></p>
                <h2>Мастер:</h2>
                    <h3>{!existMasterFIO ? "Не назначен" : existMasterFIO}</h3>
                {user.userRole === managerRole || userRole === operatorRole ? (
                    <>
                    <div>
                        <select onChange={handleChange} value={selectMaster}>
                        {masters.map((master) => <option value={master.userid}>{master.fio}</option>)}
                        </select>
                        <Button onClick={() => select(request.requestid)}>Назначить мастера</Button>
                    </div>
                    <div>
                        <p>Статистика:{requestStatistic}</p>
                    </div>

                    </>) : user.userRole === masterRole ? 
                    (
                    <>
                        <select onChange={handleChange} value={selectMaster}>
                        <option value={InProgressRequestStatus}>{InProgressRequestStatus}</option>
                        <option value={ReadyRequestStatus}>{ReadyRequestStatus}</option>
                        </select>
                    <Button onClick={() => selectStatus(request.requestid)}>Изменить статус</Button>

                    </>
                    ) : (
                        <>
                        <Button onClick={() => navigate(`update/${request.requestid}`)}>Изменить данные</Button>
                        </>
                    )
                }
                <Button onClick={() => navigate(`comms/${request.requestid}`)}>Просмотреть комментарии</Button>
            </div>
        </>
    )
}