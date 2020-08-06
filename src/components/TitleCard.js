import React, {useEffect} from "react";
const TitleCard = ({props}) => {
    useEffect(()=>{
        console.log(`../resources/title/${props}.jpg`)
    },[props]);
    return (
        <div
            className="title-card card"
        >
            <img

                className="card-img-top"
                src={require(`../resources/title/${props}.jpg`)}
                alt="Card image cap"
                style={{width:"20vw",height:"30vh"}}

            />
                <div
                    className="card-body"

                >
                    <h5 className="card-title">{props}</h5>
                    <p className="card-text" style={{fontSize:"2vh"}}>All Starwars {props}</p>
                    <a href={`/${props}`} className="btn btn-outline-primary">Go</a>
                </div>

        </div>
    )
};

export default TitleCard;
