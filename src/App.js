import React,{useEffect,useState} from 'react'
import axios from 'axios';
import TitleCard from "./components/TitleCard";
import {withRouter} from 'react-router';
import { Route, Switch} from "react-router-dom";
import { useLocation } from 'react-router-dom'
import ResultPage from "./components/ResultPage";

const App = ({persistor}) => {
    const location = useLocation();
    const [isTitle,SetTitle] = useState([]);
    // const [isResultPage,SetResultPage] = useState([]);
    const titleDivs = [];

    useEffect(()=>{
        axios.get('https://swapi.dev/api/')
            .then((res)=>{
                Object.keys(res.data).forEach(function(key) {
                    SetTitle(isTitle=>[...isTitle,key]);
                });
            }).then((res)=> {
                if(location.pathname==="/")
                    persistor.purge();
        }
        )
            .catch(function (error) {
                console.log(error);
            });
    },[]);

    isTitle.map((element)=>{
        titleDivs.push(<TitleCard key={element} props={element}/>);
    });

    return(
        <main>
            <Switch>
                <Route exact path="/" render={()=>(
                    <div
                        className="title-col card-columns"
                        style={{
                            height:"50vh",
                            display: "flex",
                            flexWrap: "wrap",
                            alignItems: "center",
                            justifyContent: "center"}}
                    >
                        {titleDivs}
                    </div>
                )}>
                </Route>
                <Route path={`${location.pathname}`} render={()=>(
                    <ResultPage props={location.pathname}/>
                )}>

                </Route>
            </Switch>


        </main>
    )
};

export default withRouter(App);
