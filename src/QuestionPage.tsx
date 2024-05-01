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
    return <div style={{height: "100%", width: "100%"}}>
        <div style={{height: "80%", width: "100%", display: "flex", justifyContent: "center", alignItems: "center", alignContent: "center"}}>
            <img src={"/words/" + wordId + ".png"} alt={"The word you need to label"} style={{height: "20%"}}/>
        </div>
        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", height: "20%", position: "absolute", bottom: "0", width: "100%"}}>
            {feature !== Feature.GENERAL_READABILITY ? <>
                <button onClick={() => submit(0)} style={{backgroundColor: rating[feature] === 0 ? "green" : undefined, width: "33%"}}>0 - nicht vorhanden</button>
                <button onClick={() => submit(1)} style={{backgroundColor: rating[feature] === 1 ? "green" : undefined, width: "33%"}}>1 - vorhanden</button>
                <button onClick={() => submit(2)} style={{backgroundColor: rating[feature] === 2 ? "green" : undefined, width: "33%"}}>2 - stark vorhanden</button>
            </> : <>
                <button onClick={() => submit(0)} style={{backgroundColor: rating[feature] === 0 ? "green" : undefined, width: "19.5%"}}>0 - nicht vorhanden</button>
                <button onClick={() => submit(1)} style={{backgroundColor: rating[feature] === 1 ? "green" : undefined, width: "19.5%"}}>1 - vorhanden</button>
                <button onClick={() => submit(2)} style={{backgroundColor: rating[feature] === 2 ? "green" : undefined, width: "19.5%"}}>2 - stark vorhanden</button>
                <button onClick={() => submit(3)} style={{backgroundColor: rating[feature] === 3 ? "green" : undefined, width: "19.5%"}}>3 - stark vorhanden</button>
                <button onClick={() => submit(4)} style={{backgroundColor: rating[feature] === 4 ? "green" : undefined, width: "19.5%"}}>4 - stark vorhanden</button>
            </>}
        </div>
    </div>
}

export default QuestionPage