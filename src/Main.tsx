import React, {ReactNode, useContext, useEffect, useState} from "react";
import {UserContext} from "./Login";
import logo from "./logo.svg";

const FUTURE_BUFFER_MIN_LENGTH = 3
const PAST_BUFFER_MAX_LENGTH = 10

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
            for(let i= 1; i<=FUTURE_BUFFER_MIN_LENGTH; i++) {
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

    console.log(pastPageBuffer.length + " - " + futurePageBuffer.length)

    return <div style={{maxWidth: "1024px"}}>
        {currentPage}
        <button onClick={() => nextPage()}>forward</button>
        {pastPageBuffer.length > 0 && <button onClick={() => prevPage()}>back</button>}
        <img src={logo} className="App-logo" alt="logo"/>
        <p>
            Hello {user.name}
        </p>
        <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
        >
            Learn React
        </a>
    </div>
}

export default Main;