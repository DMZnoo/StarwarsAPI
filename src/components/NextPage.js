import React,{ useState,useEffect} from "react";
import axios from 'axios';
import {useLocation,useHistory} from 'react-router-dom';
import Pagination from "react-bootstrap/Pagination";
const NextPage = ({props, loading}) => {
    const location = useLocation();
    const history = useHistory();
    const [isPrev,SetPrev] = useState({
        disable:false,
        url:null
    });
    const [isNext,SetNext] = useState({
        disable:false,
        url:null
    });

    let endPoint = "https://swapi.dev/api";
    useEffect(()=> {
        let url = endPoint+props+location.search;
        if(url.search(/\/$/g) === -1 &&
            url.search(/page/g) === -1)
        {
            url += "/?page=1";
        }
        console.log("NEXT PAGE: ",url);
        axios.get(`${url}`)
            .then((res)=>{
                if(res.data.hasOwnProperty('previous'))
                {
                    if(res.data.previous != null) {
                        SetPrev((isPrev)=>{
                            return {disable: false, url: res.data.previous}
                        });
                    }
                    else {
                        SetPrev((isPrev) => {
                            return {disable: true, url: null}
                        });
                    }

                }

                if(res.data.hasOwnProperty('next'))
                {
                    if(res.data.next != null) {
                        SetNext((isNext) => {
                            return {disable: false, url: res.data.next}
                        });
                    }
                    else
                        SetNext((isNext)=>{
                            return {disable: true, url: null}
                        });

                }
                loading(false);
            })
            .catch(function (error) {
            console.log(error);
        });
    },[]);

    return (
        <div className="container">
            <div className="row">
                {isPrev.url === null ? (
                    <button
                        onClick={()=>(
                            ((location.pathname.search(/[^0-9]/g) === -1) || (location.search === "?page=1")) ?
                                history.push("/") :
                                history.goBack())}
                        className="btn btn-outline-info col"
                    >
                        Prev
                    </button>
                ) : (
                        <a
                            href={`${isPrev.url.replace(/http:\/\/swapi.dev\/api/g,"")}`}
                            className="btn btn-outline-info col"
                        >
                            Prev
                        </a>
                )
                }
                <button
                    className="btn btn-outline-info col"
                    onClick={()=>{
                        history.push("/")
                    }}
                >
                    <a>Home</a>
                </button>

                {isNext.url === null ? (
                    <button
                        disabled={isNext.disable}
                        className="btn btn-outline-info col"
                    >
                        <a>Next</a>
                    </button>

                ) : (
                    <a
                        href={`${isNext.url.replace(/http:\/\/swapi.dev\/api/g,"")}`}
                        className="btn btn-outline-info col"
                    >
                        Next
                    </a>
                )
                }
            </div>
        </div>
    )
};
export default NextPage;
