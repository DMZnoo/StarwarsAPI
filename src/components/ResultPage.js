import React, {useState} from "react";
import ResultCard from "./ResultCard";
import NextPage from "./NextPage";
const ResultPage = ({props}) => {
    const [isLoading,SetLoading] = useState(true);
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
                    // SetPages={SetPages}
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
