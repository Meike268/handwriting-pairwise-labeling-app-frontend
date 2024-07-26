import {get} from "../authentication/io";

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
    alt: string
    private _loaded: boolean

    constructor(src: string, alt: string) {
        this.src = src
        this.alt = alt
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