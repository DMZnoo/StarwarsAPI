import React,{ useState,useEffect} from "react";
import axios from 'axios';
import {useLocation,useHistory,Redirect} from 'react-router-dom';
import {useSelector} from "react-redux";
const NextPage = ({props, loading}) => {
    const urlInStore = useSelector(state => state.links.prevUrl);
    const location = useLocation();
    const history = useHistory();
    const [isDescPage,SetDescPage] = useState(0);
    const [isDescPrev,SetDescPrev] = useState(0);
    const [isDescNext,SetDescNext] = useState(0);
    const [isPrev,SetPrev] = useState({
        url:null
    });
    const [isNext,SetNext] = useState({
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
        if(url.search(/[0-9]/g) !== -1 && url.search(/page/g) === -1)
        {
            SetDescPage(parseInt(url.match(/[0-9]/g).join("")));
            for(let i =0; i < urlInStore.length; i++)
            {

                if(urlInStore[i] === parseInt(url.match(/[0-9]/g).join("")))
                {

                    if((i+1) > (urlInStore.length-1))
                        SetDescNext(-1);
                    else
                        SetDescNext(urlInStore[i+1]);
                    if((i-1) < 0)
                        SetDescPrev(-1);
                    else
                        SetDescPrev(urlInStore[i-1]);
                }
            }
        }
        axios.get(`${url}`)
            .then((res)=>{
                if(res.data.hasOwnProperty('results'))
                {
                    history.state = res.data.results.map((el)=>{return(el.url)});
                }
                if(res.data.hasOwnProperty('previous'))
                {
                    if(res.data.previous != null) {
                        SetPrev((isPrev)=>{
                            return {url: res.data.previous}
                        });
                    }
                    else {
                        SetPrev((isPrev) => {
                            return {url: null}
                        });
                    }

                }
                if(res.data.hasOwnProperty('next'))
                {
                    if(res.data.next != null) {
                        SetNext((isNext) => {
                            return {url: res.data.next}
                        });
                    }
                    else
                        SetNext((isNext)=>{
                            return {url: null}
                        });

                }
                loading(false)
            })
            .catch(function (error) {
            console.log(error);
            alert("PAGE NOT FOUND")
            return (<Redirect exact path={"/"}/>)
        });
    },[]);

    return (
        <div className="container pb-1">
            <div className="row">
                {isDescPage > 0 ? (
                    <a
                        style={{visibility:isDescPrev === -1 ? "hidden" : "visible"}}
                        href={(isDescPrev === -1) ? "" : location.pathname.replace(/[0-9]+/g,isDescPrev)}
                        className="btn btn-outline-info col"
                    >
                        Prev
                    </a>
                ) : (
                    <a
                        style={{visibility:isPrev.url === null ? "hidden" : "visible"}}
                        href={(isPrev.url === null) ? "" : location.pathname.replace(/[0-9]+/g,isDescPrev)}
                        className="btn btn-outline-info col"
                    >
                        Prev
                    </a>

                )

                }

                <a
                    className="btn btn-outline-info col"
                    href={(
                        ((location.pathname.search(/[^0-9]/g) === -1) || (location.search === "?page=1")) ?
                            "/" :
                            (location.pathname.search(/[0-9]/g) !== -1 ? "/"+location.pathname.split("/")[1] : "/"))
                            }
                >
                    <a>Home</a>
                </a>
                {isDescPage > 0 ? (
                    <a
                        style={{visibility:isDescNext === -1 ? "hidden" : "visible"}}
                        href={(isDescNext === -1) ? "": location.pathname.replace(/[0-9]+/g,isDescNext)}
                        className="btn btn-outline-info col"
                    >
                        Next
                    </a>
                )
                    :
                    (
                        <a
                            style={{visibility:isNext.url === null ? "hidden" : "visible"}}
                            href={(isNext.url === null) ? "": `${isNext.url.replace(/http:\/\/swapi.dev\/api/g,"")}`}
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
