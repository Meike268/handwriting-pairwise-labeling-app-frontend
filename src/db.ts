import * as localforage from "localforage";
import Feature from "./Feature";
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
export type FeatureRating = {
    [Feature.BASELINE]: 0 | 1 | 2 | undefined,
    [Feature.CLOSED_FORMS]: 0 | 1 | 2 | undefined,
    [Feature.HEIGHT]: 0 | 1 | 2 | undefined,
    [Feature.INCLINATION]: 0 | 1 | 2 | undefined,
    [Feature.NO_CORRECTIONS]: 0 | 1 | 2 | undefined,
    [Feature.SPACING]: 0 | 1 | 2 | undefined,
    [Feature.ROUNDNESS]: 0 | 1 | 2 | undefined,
    [Feature.GENERAL_READABILITY]: 0 | 1 | 2 | 3 | 4 | 5 | undefined,
}
function blankFeatureRating() {
    return {
        [Feature.BASELINE]: undefined,
        [Feature.CLOSED_FORMS]: undefined,
        [Feature.HEIGHT]: undefined,
        [Feature.INCLINATION]: undefined,
        [Feature.NO_CORRECTIONS]: undefined,
        [Feature.SPACING]: undefined,
        [Feature.ROUNDNESS]: undefined,
        [Feature.GENERAL_READABILITY]: undefined,
    }
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