import * as localforage from "localforage";
import Feature, {FeatureRating} from "./Feature";
import wordIds from "./wordIds";

export type WordIdType = typeof wordIds[number]
export class WordRating {
    wordId: WordIdType
    rating: FeatureRating

    constructor(wordId: WordIdType) {
        this.wordId = wordId
        this.rating = blankFeatureRating()
    }
}

function blankFeatureRating(): FeatureRating {
    let ret: Partial<FeatureRating> = {}
    for (let feature in Object.values(Feature))
        ret[feature as Feature] = undefined
    return ret as FeatureRating
}

function storeDefaultCallback<T>(err: any, value: T): T {
    if (err !== null)
        console.error(err)
    return value
}

class LocalDatabase {
    store: LocalForage
    constructor(instanceName: string) {
        this.store =  localforage.createInstance({name: instanceName})
        this.store.setDriver([
            localforage.LOCALSTORAGE,
            localforage.INDEXEDDB,
            localforage.WEBSQL
        ]).then(() => console.log("Created local storage"))
    }

    public async getWordRating(wordId: WordIdType): Promise<WordRating> {
        let value: WordRating | null = await this.store.getItem("word_" + wordId, storeDefaultCallback)

        if (value === null)
            value = new WordRating(wordId)
        return value
    }

    public async updateWordRating(wordId: WordIdType, rating: Partial<FeatureRating>) {
        let wordRating = await this.getWordRating(wordId)
        wordRating.rating = {...wordRating.rating, ...rating}
        return await this.store.setItem("word_" + wordId, wordRating, storeDefaultCallback)
    }

    public async incrementProgressPointer() {
        let progressPointer = await this.getProgressPointer()
        progressPointer++
        return await this.store.setItem("progressPointer", progressPointer, storeDefaultCallback)
    }

    public async getProgressPointer(): Promise<number> {
        const currentPointer: number | null = await this.store.getItem("progressPointer", storeDefaultCallback)
        return currentPointer ?? 0
    }

    public async getExport() {
        let ratings: any = {}
        for (const id of wordIds) {
            ratings[id] = (await this.getWordRating(id)).rating
        }
        return ratings
    }
}

const db = new LocalDatabase("ratings")
export default db