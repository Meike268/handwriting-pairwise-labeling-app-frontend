import {get} from "../authentication/io";
import React, {CSSProperties, useEffect, useState} from "react";

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
    private _loaded: boolean

    constructor(src: string) {
        this.src = src
        this._loaded = false
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
    const [dataSrc, setDataSrc] = useState<string | undefined>(undefined)

    useEffect(() => {
        const preloadableSrc = (typeof src === "string") ? new PreloadableImageSrc(src) : src
        preloadableSrc.load().then(res => setDataSrc(res.src))
    }, []);

    if (dataSrc === undefined)
        return <div style={style}/>
    return <img src={dataSrc} alt={alt} style={style}/>
}