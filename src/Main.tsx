import React, {ReactNode, useContext, useEffect, useRef, useState} from "react";
import QuestionPage from "./pages/QuestionPage";
import Feature, {as_human_readable, FeatureRating} from "./util/Feature";
import db, {WordIdType} from "./util/db";
import WordIds from "./constants/wordIds";
import HintPage from "./pages/HintPage";
import EndPage from "./pages/EndPage";
import wordIds from "./constants/wordIds";
import ProgressBar from "./components/ProgressBar";
import {DisplayContext} from "./util/DisplayContext";
import {put} from "./authentication/io";
import {BACKEND_ROOT} from "./constants/Urls";

const FUTURE_BUFFER_MIN_LENGTH = 3
const PAST_BUFFER_MAX_LENGTH = 10

const NAVIGATION_BUTTON_RELATIVE_WIDTH = 15

type PageData = {
    content: ReactNode
    number: number
    data: HintPageData | QuestionPageData
}

type HintPageData = {
    feature: Feature | "End"
}

type QuestionPageData = {
    feature: Feature
    rating: FeatureRating | undefined
    wordId: WordIdType
}

const Main: React.FC = () => {
    const display = useContext(DisplayContext)!
    const [pageBuffer, setPageBuffer] = useState<PageData[]>([])
    const bufferRef = useRef<PageData[]>();
    bufferRef.current = pageBuffer

    const [bufferPointer, setBufferPointer] = useState<number>(0)
    const pointerRef = useRef<number>();
    pointerRef.current = bufferPointer

    const [pageNumber, setPageNumber] = useState(0)
    const pageNumberRef = useRef<number>();
    pageNumberRef.current = pageNumber

    useEffect(() => {
        async function loadInitialPages() {
            const initialBuffer: PageData[] = []
            let i = await db.getProgressPointer()
            for (; initialBuffer.length <= FUTURE_BUFFER_MIN_LENGTH; i++) {
                const newPage = generateNewPage(i)
                if (newPage !== undefined) initialBuffer.push(newPage)
            }
            setPageBuffer(initialBuffer)
            setPageNumber(i)
        }

        loadInitialPages().then(() => console.log("Init finished"))
    }, [])

    function generateNewPage(n: number): PageData | undefined {
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

        if (currentFeatureIndicator >= 8) return {
            content: <EndPage/>,
            number: n,
            data: {feature: "End"}
        }

        const featureProgress = n % (pagesPerFeature)
        if (featureProgress === 0) return {
            content: <HintPage feature={currentFeature} onStart={() => onSubmit()}/>,
            number: n,
            data: {feature: currentFeature}
        }

        return {
            //@ts-ignore
            content: <QuestionPage key={featureProgress} wordId={(featureProgress - 1).toString()}
                                   feature={currentFeature} onSubmit={() => onSubmit()}/>,
            number: n,
            data: {
                feature: currentFeature,
                rating: undefined,
                // @ts-ignore
                wordId: (featureProgress - 1).toString()
            }
        }
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

    const page = pageBuffer[bufferPointer]
    const header = page.data.feature !== "End" ? as_human_readable(page.data.feature) : "Dankeschön❤️"

    return <div style={{width: display.width, height: display.height, maxWidth: "1024px"}}>
        <button onClick={() => put(BACKEND_ROOT + "/greeting",{"clause": "oh hi", "name": "mark"}).then(async res => console.log(await res!.text()))}>AAAAAAAAAAAAAAAAAAAAAAAAAAAAA</button>
        <div style={{position: "relative", width: "100%", top: "0", height: "6%", overflow: "hidden", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
            { pastBufferLength <= 0 ? <div style={{width: NAVIGATION_BUTTON_RELATIVE_WIDTH + "%"}}/> :
                <button onClick={() => prevPage()} style={{width: NAVIGATION_BUTTON_RELATIVE_WIDTH + "%", height: "100%", color: "lightgreen", fontWeight: "bolder", cursor: "pointer"}}>zurück</button>
            }
            <h1 style={{height: "min-content", maxWidth: (100-NAVIGATION_BUTTON_RELATIVE_WIDTH*2) + "%"}}>{header}</h1>
            { futureBufferLength < 1 || futureBufferLength <= 3 ? <div style={{width: NAVIGATION_BUTTON_RELATIVE_WIDTH + "%"}}/> :
                <button onClick={() => nextPage()} style={{width: NAVIGATION_BUTTON_RELATIVE_WIDTH + "%", height: "100%", color: "lightgreen", fontWeight: "bolder", cursor: "pointer"}}>weiter</button>
            }
        </div>
        <ProgressBar style={{height: "1.5%"}} current={page.number} end={8 * (1+wordIds.length)}/>
        <div style={{height: "92.5%", width: "100%", display:"flex", justifyItems: "center", alignItems: "center"}}>{pageBuffer[bufferPointer].content}</div>
    </div>
}

export default Main;