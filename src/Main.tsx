import React, {ReactNode, useEffect, useRef, useState} from "react";
import QuestionPage from "./QuestionPage";
import Feature from "./Feature";
import db from "./db";
import WordIds from "./wordIds";
import HintPage from "./HintPage";

const FUTURE_BUFFER_MIN_LENGTH = 3
const PAST_BUFFER_MAX_LENGTH = 10

const NAVIGATION_BUTTON_RELATIVE_WIDTH = 15

const Main: React.FC = () => {
    const [pageBuffer, setPageBuffer] = useState<ReactNode[]>([])
    const bufferRef = useRef<ReactNode[]>();
    bufferRef.current = pageBuffer

    const [bufferPointer, setBufferPointer] = useState<number>(0)
    const pointerRef = useRef<number>();
    pointerRef.current = bufferPointer

    const [pageNumber, setPageNumber] = useState(0)
    const pageNumberRef = useRef<number>();
    pageNumberRef.current = pageNumber

    useEffect(() => {
        async function loadInitialPages() {
            const initialBuffer: ReactNode[] = []
            let i = await db.getProgressPointer()
            for (; initialBuffer.length <= FUTURE_BUFFER_MIN_LENGTH; i++) {
                initialBuffer.push(generateNewPage(i))
            }
            setPageBuffer(initialBuffer)
            setPageNumber(i)
        }

        loadInitialPages().then(() => console.log("Init finished"))
    }, [])

    function generateNewPage(n: number): ReactNode | undefined {
        const pagesPerFeature = 1 + WordIds.length

        const currentFeatureIndicator = n / pagesPerFeature
        let currentFeature = Feature.BASELINE
        if (currentFeatureIndicator >= 1) currentFeature = Feature.HEIGHT
        if (currentFeatureIndicator >= 2) currentFeature = Feature.INCLINATION
        if (currentFeatureIndicator >= 3) currentFeature = Feature.NO_CORRECTIONS
        if (currentFeatureIndicator >= 4) currentFeature = Feature.SPACING
        if (currentFeatureIndicator >= 5) currentFeature = Feature.ROUNDNESS
        if (currentFeatureIndicator >= 6) currentFeature = Feature.CLOSED_FORMS
        if (currentFeatureIndicator >= 7) currentFeature = Feature.GENERAL_READABILITY

        const featureProgress = n % (pagesPerFeature)
        if (featureProgress === 0)
            return <HintPage feature={currentFeature} onStart={() => onSubmit()}/>
        // @ts-ignore
        return <QuestionPage key={featureProgress} wordId={(featureProgress-1).toString()} feature={currentFeature} onSubmit={() => onSubmit()}/>
    }

    function onSubmit() {
        db.incrementProgressPointer()
        nextPage()
    }

    function nextPage() {
        let tmpPageBuffer = bufferRef.current!
        let tmpPointer = pointerRef.current!

        const pastPageBuffer = tmpPointer
        const futurePageBuffer = tmpPageBuffer.length - tmpPointer - 1

        if (futurePageBuffer <= FUTURE_BUFFER_MIN_LENGTH) {
            let newPage= generateNewPage(pageNumberRef.current!)
            if (newPage !== undefined) {
                setPageNumber(pageNumberRef.current! + 1)
                tmpPageBuffer.push(newPage)
            }
        }

        if (pastPageBuffer >= PAST_BUFFER_MAX_LENGTH) {
            tmpPageBuffer.shift()
            tmpPointer -= 1
        }

        setPageBuffer(tmpPageBuffer)
        setBufferPointer(tmpPointer + 1)
    }

    function prevPage() {
        if (bufferPointer > 0)
            setBufferPointer(bufferPointer - 1)
        else
            console.error("Tried to exceed PageBuffer")
    }

    if (pageBuffer.length === 0)
        return<div/>

    const pastBufferLength = bufferPointer
    const futureBufferLength = pageBuffer.length - bufferPointer - 1
    console.log ("PageBuffer health: " + pastBufferLength + " | " + futureBufferLength)

    return <div style={{width: "100vw", height: "100vh", maxWidth: "1024px"}}>
        <div style={{position: "relative", width: "100%", top: "0", height: "50px", overflow: "hidden", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderBottom: "4px solid #888"}}>
            { pastBufferLength <= 0 ? <div style={{width: NAVIGATION_BUTTON_RELATIVE_WIDTH + "%"}}/> :
                <div onClick={() => prevPage()} style={{width: NAVIGATION_BUTTON_RELATIVE_WIDTH + "%", color: "green", fontWeight: "bolder", cursor: "pointer"}}>back</div>
            }
            <div style={{height: "min-content", maxWidth: NAVIGATION_BUTTON_RELATIVE_WIDTH*2 + "%"}}>Question</div>
            { futureBufferLength < 1 || futureBufferLength <= 3 ? <div style={{width: NAVIGATION_BUTTON_RELATIVE_WIDTH + "%"}}/> :
                <div onClick={() => nextPage()} style={{width: NAVIGATION_BUTTON_RELATIVE_WIDTH + "%", color: "green", fontWeight: "bolder", cursor: "pointer"}}>forward</div>
            }
        </div>
        {pageBuffer[bufferPointer]}
    </div>
}

export default Main;