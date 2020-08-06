import React, {useEffect, useState} from "react";
import ResultCard from "./ResultCard";
import NextPage from "./NextPage";
import {useLocation} from "react-router-dom";

const ResultPage = ({props}) => {
    const location = useLocation();
    const [isRedirect,SetRedirect] = useState(props);

    useEffect(()=>{
        console.log("LOCATION OF RESULTPAGE: " + isRedirect);
    },[location])

    const redirectCalled = (url) => {
        SetRedirect(url);
    }

    return(
        <div>
            <ResultCard props={isRedirect} redirectcall={redirectCalled}/>
            <NextPage props ={isRedirect} redirectcall={redirectCalled}/>
        </div>

    )
};
export default ResultPage;
