import { useEffect, useState } from "react";
import { CommentAPI } from "../API/CommentAPI";
import Cookies from "js-cookie";
import "../css/commentStyle.css"
import { UserAPI } from "../API/UserAPI";
import { Token } from "../DB/ConstData";

export default function Comments({id}){
    const [comments, setComments] = useState([])
    const [masterFIO, setMasterFIO] = useState('')
    const [token, setToken] = useState('')

    useEffect(() => {
        async function getData()
        {
            const token = await Token()
            setToken(token)

            const comms = await CommentAPI.get(id, token)
            setComments(comms)

            if(!comms) return;
            const master = await UserAPI.get(comms[0].masterid);
            setMasterFIO(master.fio)
        }

        getData()
    },[])

    return(<>
        {comments.length > 0 ? (comments.map(comment => <>
        <div className="comment" key={comment.commentid}>
            <p>{`${masterFIO}, мастер`}</p>
            <textarea readOnly>{comment.message}</textarea>
        </div>
        </>)) : (<><h2>Комментариев нет</h2></>)}
    </>)
}