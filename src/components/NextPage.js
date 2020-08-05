import React,{ useState,useEffect} from "react";
import { Redirect} from 'react-router-dom';
import axios from 'axios';
const NextPage = ({props}) => {
    const [isPrev,SetPrev] = useState({
        exist:false,
        url: ""
    });
    const [isNext,SetNext] = useState({
        exist:false,
        url:""
    });
    const [isRedirect,SetRedirect] = useState({
        prev:false,
        next:false
    });
    useEffect(()=> {
        axios.get(`https://swapi.dev/api${props}`)
            .then((res)=>{
                if(res.data.hasOwnProperty('previous'))
                {
                    if(res.data.previous != null)
                        SetPrev({...isPrev,exist: false});
                    else
                        SetPrev({...isPrev,exist: true,url:res.data.previous});
                }
                if(res.data.hasOwnProperty('next'))
                {
                    if(res.data.next != null)
                        SetNext({...isNext,exist: false});
                    else
                        SetNext({...isNext,exist: true,url:res.data.next});
                }
                console.log(res);
            }).catch(function (error) {
            console.log(error);
        });
    },[]);

    const mouseAction = () => {
        if(isPrev)
            SetRedirect({...isRedirect,prev:true});
        else
            SetRedirect({...isRedirect,next:true});
    };

    if(isRedirect.prev)
    {
        return(<Redirect exact to={`${isPrev.url}`}/>)
    } else if (isRedirect.next)
    {
        return(<Redirect exact to={`${isNext.url}`}/>)
    }
    return (
        <div className="container">
            <div className="row">
                <button
                    className="btn btn-outline-info col"
                    disabled={isPrev.exist}
                    onClick={mouseAction}
                >
                    Prev
                </button>
                <button
                    className="btn btn-outline-info col"
                    disabled={isNext.exist}
                    onClick={mouseAction}
                >
                    Next
                </button>
            </div>

        </div>
    )
};
export default NextPage;
