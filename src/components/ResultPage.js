import React, {useEffect, useState} from "react";
import ResultCard from "./ResultCard";
import NextPage from "./NextPage";
import {useLocation} from "react-router-dom";
import styled from 'styled-components';

const ResultPage = ({props}) => {
    const location = useLocation();
    const [isLoading,SetLoading] = useState(true);
    useEffect(()=>{
    },[isLoading])

    const setPageLoading = (bool) =>{
        SetLoading(bool)
    }

    return(
        <div>
            <div
                style={{visibility: isLoading ? "hidden" : "visible"}}
            >
                <ResultCard
                    props={props}
                    loading={setPageLoading}
                />
                <NextPage
                    props ={props}
                    loading={setPageLoading}
                />
                </div>
            {isLoading && (
                <div className="d-flex justify-content-center">
                    <div
                        className="spinner-border text-primary"
                        role="status"
                        style={{
                            alignContent:"center",
                            width: "3rem",
                            height: "3rem"
                        }}
                    >
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            )

            }




        </div>

    )
};
export default ResultPage;
