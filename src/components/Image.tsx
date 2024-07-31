import {get} from "../authentication/io";
import React, {CSSProperties, useState} from "react";

export const preloadImage = async (src: string): Promise<string> => {
    const theBlob = await ((await get(src, undefined, false)) as Response).blob()
    return new Promise((resolve, reject)  => {
        const fr = new FileReader();
        fr.onload = () => {
            if (typeof fr.result === "string")
                resolve(fr.result)
            else
                reject("Not image data")
        };
        fr.onerror = reject;

        fr.readAsDataURL(theBlob);
    });
};

export class PreloadableImageSrc {
    src: string
    origin: string
    private _loaded: boolean

    constructor(src: string) {
        this.src = src
        this._loaded = false
        this.origin = src
    }

    async load() {
        if (this._loaded)
            return this
        this.src = await preloadImage(this.src)
        this._loaded = true
        return this
    }
}

export const Image: React.FC<{src: PreloadableImageSrc | string, alt: string, style?: CSSProperties}> = ({src, alt, style}) => {
    const [origin, setOrigin] = useState<string | undefined>(undefined)

    const [dataSrc, setDataSrc] = useState<string | undefined>(undefined)

    if (src instanceof PreloadableImageSrc) {
        if (origin != src.origin) {
            src.load().then(res =>
                setDataSrc(res.src)
            )
            setOrigin(src.origin)

        }
    }




    if (dataSrc === undefined)
        return <div style={style}/>
    return <img src={dataSrc} alt={alt} style={style}/>
}