import React, {createContext, ReactNode, useEffect, useState} from "react";

export enum DisplaySize {xs, sm, md, lg, xl}

export type DisplayContextType = { width: number, height: number}
export const DisplayContext = createContext<DisplayContextType | undefined>(undefined)

export const DisplayProvider: React.FC<{ children: ReactNode }> = ({children}) => {
    const [width, setWidth] = useState<number>(100)
    const [height, setHeight] = useState<number>(100)

    const handleResize = () => {
        const display= getWindowDimensions()
        setWidth(display.width)
        setHeight(display.height)
    }

    useEffect(() => {
        handleResize()
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return <DisplayContext.Provider value={{width: width, height: height}}>
        {children}
    </DisplayContext.Provider>
}

function getWindowDimensions(): {width: number, height: number} {
    const {innerWidth, innerHeight} = window;
    return {width: innerWidth, height: innerHeight};
}
