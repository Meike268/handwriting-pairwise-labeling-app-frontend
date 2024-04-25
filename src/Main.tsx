import React, {ReactNode, useContext, useEffect, useState} from "react";
import {UserContext} from "./Login";

const FUTURE_BUFFER_MIN_LENGTH = 3
const PAST_BUFFER_MAX_LENGTH = 10

const NAVIGATION_BUTTON_RELATIVE_WIDTH = 15

const Main: React.FC = () => {
    const user = useContext(UserContext)!
    const [currentPage, setCurrentPage] = useState<ReactNode | undefined>(undefined)
    const [pastPageBuffer, setPastPageBuffer] = useState<ReactNode[]>([])
    const [futurePageBuffer, setFuturePageBuffer] = useState<ReactNode[]>([])
    const [pageNumber, setPageNumber] = useState(0)

    useEffect(() => {
        async function loadInitialPages() {
            const initialPage = generateNewPage(0)
            setCurrentPage(initialPage)

            const initialFutureBuffer: ReactNode[] = []
            for (let i = 1; i <= FUTURE_BUFFER_MIN_LENGTH; i++) {
                initialFutureBuffer.push(generateNewPage(i))
            }
            setFuturePageBuffer(initialFutureBuffer)

            setPageNumber(initialFutureBuffer.length + 1)
        }

        console.log("useEffect")
        loadInitialPages().then(() => console.log("Init finished"))
    }, [])

    async function loadNewPageToBuffer(): Promise<void> {
        const tmpFuturePageBuffer = futurePageBuffer
        tmpFuturePageBuffer.push(generateNewPage(pageNumber))
        setFuturePageBuffer(tmpFuturePageBuffer)
        setPageNumber(pageNumber + 1)
    }

    function generateNewPage(n: number) {
        return <div>{n}</div>
    }

    function nextPage() {
        if (currentPage !== undefined) {
            const tmpPastPageBuffer = pastPageBuffer
            tmpPastPageBuffer.push(currentPage) // lifo
            if (tmpPastPageBuffer.length > PAST_BUFFER_MAX_LENGTH)
                tmpPastPageBuffer.shift()
            setPastPageBuffer(tmpPastPageBuffer)
        }

        setCurrentPage(futurePageBuffer.shift()) // fifo

        if (futurePageBuffer.length < FUTURE_BUFFER_MIN_LENGTH)
            loadNewPageToBuffer().then(() => console.log("Page added to buffer"))
    }

    function prevPage() {
        const tmpFuturePageBuffer = futurePageBuffer
        tmpFuturePageBuffer.unshift(currentPage)
        setFuturePageBuffer(tmpFuturePageBuffer)
        setCurrentPage(pastPageBuffer.pop())
    }

    return <div style={{width: "100vw", height: "100vh", maxWidth: "1024px"}}>
        <div style={{position: "relative", width: "100%", top: "0", height: "50px", overflow: "hidden", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderBottom: "4px solid #888"}}>
            { pastPageBuffer.length <= 0 ? <div style={{width: NAVIGATION_BUTTON_RELATIVE_WIDTH + "%"}}/> :
                <div onClick={() => prevPage()} style={{width: NAVIGATION_BUTTON_RELATIVE_WIDTH + "%", color: "green", fontWeight: "bolder", cursor: "pointer"}}>back</div>
            }
            <div style={{height: "min-content", maxWidth: NAVIGATION_BUTTON_RELATIVE_WIDTH*2 + "%"}}>Question</div>
            { futurePageBuffer.length <= 0 ? <div style={{width: NAVIGATION_BUTTON_RELATIVE_WIDTH + "%"}}/> :
                <div onClick={() => nextPage()} style={{width: NAVIGATION_BUTTON_RELATIVE_WIDTH + "%", color: "green", fontWeight: "bolder", cursor: "pointer"}}>forward</div>
            }
        </div>
        {currentPage}
    </div>
}

export default Main;