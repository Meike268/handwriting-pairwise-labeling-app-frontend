import {PreloadableImageSrc} from "../components/Image";
import {Me} from "../authentication/Login";
import {get} from "../authentication/io";
import {BACKEND_BATCH} from "../constants/Urls";

type BackendTaskBatch = {
    question: {
        id: number,
        description: string
    }
    referenceSentence: {
        id: number
        content: string
    }
    examplePair:{
        positiveResourceUrl: string
        negativeResourceUrl: string
    }
    samples: Array<{
        id: number,
        studentId: number,
        resourceUrl: string
    }>
}

export type Question = {
    id: number
    description: string
}
export type ReferenceSentence = {
    id: number
    content: string
}
export type ExamplePair = {
    positive: PreloadableImageSrc
    negative: PreloadableImageSrc
}
export type Score = 0 | 1 | 2 | 3 | 4
export type Sample = {
    id: number
    studentId: number
    image: PreloadableImageSrc
    score: Score | undefined
}
export type TaskBatch = {
    question: Question
    referenceSentence: ReferenceSentence
    examplePair: ExamplePair
    samples: Array<Sample>
}

async function preloadBatchImages(batch: TaskBatch) {
    await batch.examplePair.negative.load()
    await batch.examplePair.positive.load()
    for (const sample of batch.samples) {
        await sample.image.load()
    }
}

export async function fetchRandomBatch(user: Me) {
    console.info(`Fetching batch for ${JSON.stringify(user)}`)

    const batchJson = await get(BACKEND_BATCH) as BackendTaskBatch
    const batch: TaskBatch = {
        question: batchJson.question,
        referenceSentence: batchJson.referenceSentence,
        examplePair: {
            positive: new PreloadableImageSrc(batchJson.examplePair.positiveResourceUrl),
            negative: new PreloadableImageSrc(batchJson.examplePair.negativeResourceUrl)
        },
        samples: batchJson.samples.map(sampleJson => ({
            id: sampleJson.id,
            studentId: sampleJson.studentId,
            image: new PreloadableImageSrc(sampleJson.resourceUrl),
            score: undefined
        })),
    }
    preloadBatchImages(batch).then(() => console.debug("Preload of batch finished"))
    return batch
}