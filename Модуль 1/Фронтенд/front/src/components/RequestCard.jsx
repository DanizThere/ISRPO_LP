export default function RequestCard({request, onClick}){
    return(
        <>
            <div className="request" key={request.requestID} onClick={onClick}>
                <h3 className="requestDate">{request.startDate}</h3>
                <p className="requestTech">{request.TechType}:{request.homeTechModel}</p>

                <p className="requestDesc">{request.problemDescription}</p>
                <p className="requestStatus">{request.requestStatus}</p>
            </div>
        </>
    )
}