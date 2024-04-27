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
    return <div>
        <img src={"/words/" + wordId + ".png"}/>
        <div>{feature} for {wordId}</div>
        <div style={{display: "flex", flexDirection: "row", height: "20%"}}>
            <div onClick={() => submit(0)} style={{backgroundColor: rating[feature] === 0 ? "green" : "red"}}>0 - nicht vorhanden</div>
            <div onClick={() => submit(1)} style={{backgroundColor: rating[feature] === 1 ? "green" : "red"}}>1 - vorhanden</div>
            <div onClick={() => submit(2)} style={{backgroundColor: rating[feature] === 2 ? "green" : "red"}}>2 - stark vorhanden</div>
        </div>
    </div>
}

export default QuestionPage