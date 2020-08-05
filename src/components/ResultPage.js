import React,{ useState,useEffect} from "react";
import axios from "axios";
const ResultPage = ({props}) => {
    const [isResult,SetResult] = useState([]);
    const [isDesc,SetDesc] = useState([]);
    const [isShown,SetShown] = useState(false);
    let [isSearchDesc,SetSearchDesc] = useState(false);
    const mouseEvent = () => {
        SetShown(!isShown);
    };
    useEffect(()=>{
        axios.get(`https://swapi.dev/api${props}`)
            .then((res)=>{
                console.log(res.data);
                if(res.data.hasOwnProperty('count'))
                {
                    SetSearchDesc(false);
                    res.data.results.map((el)=>{
                        SetResult(isResult => [...isResult,el]);
                    });
                } else
                {
                    SetSearchDesc(true);
                    Object.keys(res.data).map((key, index) => (
                        SetDesc(isDesc => [...isDesc,
                            <div
                                className="card-body"
                                key={index}
                            >
                                {key.replace(/_/g," ")}: <div style={{fontSize:"1.5vh"}}>{res.data[key]}</div>
                            </div>])
                    ));
                }


            }).catch(function (error) {
                console.log(error);
            });
        ;
    },[]);

    return (
        <div
            className="result-col card-columns"
             style={{marginLeft:"4vw"}}
        >
            {isResult && (isResult.map((el)=>
                    <div
                        className="result card"
                        style={{position:"relative"}}
                    >
                        <a
                            href={`${el.url.replace(/http:\/\/swapi.dev\/api\//g,"")}`}
                            className="result-btn btn btn-outline-primary"
                            style={{
                                float:"right",
                                position:"relative"
                            }}
                            onClick={()=>mouseEvent}
                        >Read More</a>
                        <div className="card-body">
                            Name: { el.hasOwnProperty("name") && (
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
            }
            {isSearchDesc && (
                <div
                    className="desc card"
                    style={{position:"relative"}}
                >
                    {isDesc}
                </div>
            )
            }
        </div>
    )
};
export default ResultPage;
