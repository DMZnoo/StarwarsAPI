import React,{useEffect,useState} from 'react'
import axios from 'axios';
import TitleCard from "./components/TitleCard";
import ResultPage from "./components/ResultPage";
import {withRouter} from 'react-router';
import { Route, Switch} from "react-router-dom";
import { useLocation } from 'react-router-dom'

const App = () => {
    const location = useLocation();
    const [isTitle,SetTitle] = useState([]);
    const titleDivs = [];

    useEffect(()=>{
        axios.get('https://swapi.dev/api/')
            .then((res)=>{
                Object.keys(res.data).forEach(function(key) {
                    SetTitle(isTitle=>[...isTitle,key]);
                });
            }).catch(function (error) {
                console.log(error);
            });
        console.log(location.pathname);

    },[location]);

    isTitle.map((element)=>{
        titleDivs.push(<TitleCard props={element}/>);
    });

    return(
        <main>
            <Switch>
                <Route exact path="/">
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
                </Route>
                <Route path={`${location.pathname}`}>
                    <ResultPage props={location.pathname}/>
                </Route>
            </Switch>


        </main>
    )
};

export default withRouter(App);
