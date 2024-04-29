import "./QuestionPage.css"
import React, {useEffect, useState} from "react";
import Feature from "./Feature";
import db, {FeatureRating, WordIdType} from "./db";

const QuestionPage: React.FC<{wordId: WordIdType, feature: Feature, onSubmit: ()=>void}> = ({wordId, feature, onSubmit}) => {
    const [rating, setRating] = useState<FeatureRating | undefined>(undefined)

    useEffect(() => {
        db.getWordRating(wordId).then(ratingFromStorage => setRating(ratingFromStorage.rating))
    }, [])

    function submit(ratedValue: number) {
        const newRating = rating!
        if (ratedValue === 0 || ratedValue === 1 || ratedValue === 2)
            newRating[feature] = ratedValue
        setRating(newRating)
        db.updateWordRating(wordId, newRating)
        onSubmit()
    }

    console.log(wordId + ": " + JSON.stringify(rating))
    if (rating === undefined)
        return <div></div>
    return <div style={{height: "100%"}}>
        <img src={"/words/" + wordId + ".png"} style={{height: "10%"}}/>
        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", height: "20%", position: "absolute", bottom: "0", width: "100%"}}>
            {feature !== Feature.GENERAL_READABILITY ? <>
                <div className={"choiceField"} onClick={() => submit(0)} style={{backgroundColor: rating[feature] === 0 ? "green" : undefined, width: "33%"}}>0 - nicht vorhanden</div>
                <div className={"choiceField"} onClick={() => submit(1)} style={{backgroundColor: rating[feature] === 1 ? "green" : undefined, width: "33%"}}>1 - vorhanden</div>
                <div className={"choiceField"} onClick={() => submit(2)} style={{backgroundColor: rating[feature] === 2 ? "green" : undefined, width: "33%"}}>2 - stark vorhanden</div>
            </> : <>
                <div className={"choiceField"} onClick={() => submit(0)} style={{backgroundColor: rating[feature] === 0 ? "green" : undefined, width: "19.5%"}}>0 - nicht vorhanden</div>
                <div className={"choiceField"} onClick={() => submit(1)} style={{backgroundColor: rating[feature] === 1 ? "green" : undefined, width: "19.5%"}}>1 - vorhanden</div>
                <div className={"choiceField"} onClick={() => submit(2)} style={{backgroundColor: rating[feature] === 2 ? "green" : undefined, width: "19.5%"}}>2 - stark vorhanden</div>
                <div className={"choiceField"} onClick={() => submit(3)} style={{backgroundColor: rating[feature] === 3 ? "green" : undefined, width: "19.5%"}}>3 - stark vorhanden</div>
                <div className={"choiceField"} onClick={() => submit(4)} style={{backgroundColor: rating[feature] === 4 ? "green" : undefined, width: "19.5%"}}>4 - stark vorhanden</div>
            </>}
        </div>
    </div>
}

export default QuestionPage