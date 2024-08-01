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

/**
 * src is initially a URL that points to the resource.
 *
 * calling the load-method loads the resource from the backend and changes src to the dataSrc that was loaded in the process
 */
export class PreloadableImageSrc {
    _srcUrl: string
    _dataSrc: string | undefined

    constructor(src: string) {
        this._srcUrl = src
    }

    get src(): string {
        return this._dataSrc ?? this._srcUrl;
    }

    async load() {
        if (this._dataSrc !== undefined)
            return this
        this._dataSrc = await preloadImage(this._srcUrl)
        return this
    }
}

export const Image: React.FC<{src: PreloadableImageSrc | string, alt: string, style?: CSSProperties}> = ({src, alt, style}) => {
    const [dataSrc, setDataSrc] = useState<string | undefined>(undefined)

    useEffect(() => {
        const preloadableSrc = (typeof src === "string") ? new PreloadableImageSrc(src) : src
        preloadableSrc.load().then(res => setDataSrc(res.src))
    }, [dataSrc, src]);

    if (dataSrc === undefined)
        return <div style={style}/>
    return <img src={dataSrc} alt={alt} style={style}/>
}