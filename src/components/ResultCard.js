import React,{ useState,useEffect} from "react";
import axios from "axios";
import { useLocation,useHistory } from 'react-router-dom'
import {useDispatch} from 'react-redux';
import { getUrl } from '../actions';
const ResultCard = ({props, loading}) => {
    const location = useLocation();
    const [isResult,SetResult] = useState([]);
    const [isDesc,SetDesc] = useState([]);
    const [isSearchDesc,SetSearchDesc] = useState(false);
    const dispatch = useDispatch();
    let endPoint = "https://swapi.dev/api";
    useEffect(()=>{
        let url = endPoint+props+location.search;
        if(url.search(/\/$/g) === -1 &&
            url.search(/page/g) === -1)
        {
            url += "/?page=1";
        }
        console.log("CARD URL ",url);
        axios.get(`${url}`)
            .then((res)=>{
                console.log("CARD: ",res.data);
                if(res.data.hasOwnProperty('count'))
                {
                    SetSearchDesc(false);
                    res.data.results.map((el)=>{
                        let link = el.url.replace(/http:\/\/swapi.dev\/api\/[a-zA-Z]*\//i,"");
                        link = parseInt(link.replace(/\//g,""));
                        console.log("LINK ",link);
                        dispatch(getUrl(link));

                        SetResult(isResult => [...isResult,el]);
                    });
                } else
                {
                    SetSearchDesc(true);
                    Object.keys(res.data)
                        .forEach((key,index)=>{
                            if(Array.isArray(res.data[key]))
                            {

                                SetDesc(isDesc=>[...isDesc,
                                    <div
                                        className="card-body"
                                        key={key}
                                    >
                                        {key.replace(/_/g," ")}
                                        :
                                        <div
                                            id={`card-body-${key}`}
                                            key={key}
                                            style={{fontSize: "1.5vh"}}
                                        >
                                            {
                                                res.data[key].map((el) => {
                                                    const url = el.replace(/http/g,"https");
                                                    axios.get(`${url}`).then((res) => {
                                                        if (res.data.hasOwnProperty('title')) {
                                                            console.log(res.data.title);
                                                            let node = document.createElement("LI");
                                                            let textnode = document.createTextNode(res.data.title);
                                                            node.append(textnode);
                                                            document.getElementById(`card-body-${key}`).appendChild(node);
                                                        }
                                                        if (res.data.hasOwnProperty('name')) {
                                                            console.log(res.data.name);
                                                            let node = document.createElement("LI");
                                                            let textnode = document.createTextNode(res.data.name);
                                                            node.append(textnode);
                                                            document.getElementById(`card-body-${key}`).appendChild(node);
                                                        }
                                                    }).catch(function (err) {
                                                        console.log(err)
                                                    })

                                                })

                                            }
                                        </div>
                                    </div>
                                ])

                            }
                            else
                            {
                                if(res.data[key].search(/http/g) !== -1 && key !== "url")
                                {
                                    const url = res.data[key].replace(/http/g,"https");
                                    axios.get(`${url}`).then((res) => {
                                        if (res.data.hasOwnProperty('title')) {
                                            SetDesc(isDesc => [...isDesc,
                                                <div
                                                    className="card-body"
                                                    key={index}
                                                >
                                                    {key.replace(/_/g," ")}
                                                    :
                                                    {
                                                        <div style={{fontSize:"1.5vh"}}>{res.data.title}</div>
                                                    }
                                                </div>
                                            ])
                                        }
                                        if (res.data.hasOwnProperty('name')) {
                                            SetDesc(isDesc => [...isDesc,
                                                <div
                                                    className="card-body"
                                                    key={index}
                                                >
                                                    {key.replace(/_/g," ")}
                                                    :
                                                    {
                                                        <div style={{fontSize:"1.5vh"}}>{res.data.name}</div>
                                                    }
                                                </div>
                                            ])
                                        }
                                    }).catch(function (err) {
                                        console.log(err)
                                    })

                                }
                                else
                                {
                                    SetDesc(isDesc => [...isDesc,
                                        <div
                                            className="card-body"
                                            key={index}
                                        >
                                            {key.replace(/_/g," ")}
                                            :
                                            {
                                                <div style={{fontSize:"1.5vh"}}>{res.data[key]}</div>
                                            }
                                        </div>
                                    ])
                                }

                            }
                        })
                }

            })
            .then((res)=>loading(false))
            .catch(function (error) {
                console.log(error);
            });

    },[]);

    return (
        <div
            className="result-col card-columns ml-1 mr-1"
        >
            {isResult && (isResult.map((el,li)=>
                    (
                        <div
                            key={el+li}
                            className="result card"
                            style={{position:"relative"}}
                        >
                            <a
                                key={`result-card-${li}`}
                                href={
                                    (location.search).search(/page/i) !== -1
                                        ? `${el.url.replace(/http:\/\/swapi.dev\/api\/[a-zA-Z]*\//i,"")}`
                                        : `${el.url.replace(/http:\/\/swapi.dev\/api\//i,"")}`}
                                className="result-btn btn btn-outline-primary"
                                style={{
                                    float:"right",
                                    position:"relative"
                                }}
                            >Read More</a>
                            <div className="card-body">
                                { el.hasOwnProperty("name") && (
                                    el.name
                                )
                                }
                                { el.hasOwnProperty("title") && (
                                    el.title
                                )
                                }
                            </div>

                        </div>
                    )
                )
            )
            }
            {isSearchDesc && (
                <div
                    className="desc card"
                    style={{position:"relative"}}
                >
                    <div
                        style={{position:"absolute",left:"80vw",top:"0vh"}}
                    >
                        <a className="close p-4" href={("/"+location.pathname.split("/")[1])}>
                            <span style={{fontSize:"5vh"}}>&times;</span>
                        </a>
                    </div>

                    {isDesc}
                </div>
            )
            }
        </div>
    )
};
export default ResultCard;
