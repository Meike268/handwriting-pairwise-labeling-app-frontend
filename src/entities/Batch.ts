import {PreloadableImageSrc} from "../components/Image";
import {Me} from "../authentication/Login";
import {get} from "../authentication/io";
import {BACKEND_BATCH, BACKEND_ROOT} from "../constants/Urls";

type GetTaskBatchResponse = {
    state: string,
    body: BackendTaskBatch
}

type BackendTaskBatch = {
    question: {
        id: number,
        description: string
    }
    example: {
        exampleImagePath: string
    }
    referenceSentence: {
        id: number
        content: string
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
export type Example = {
    image: PreloadableImageSrc
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
    example: Example
    samples: Array<Sample>
}

async function preloadBatchImages(batch: TaskBatch) {
    await batch.example.image.load()
    for (const sample of batch.samples) {
        await sample.image.load()
    }
}

export async function fetchRandomBatch(user: Me) {
    console.info(`Fetching batch for ${JSON.stringify(user)}`)

    const batchResponseJson = await get(BACKEND_BATCH) as GetTaskBatchResponse

    if (batchResponseJson.state === "finished") {
        return null
    } else {
        const batch: TaskBatch = {
            question: batchResponseJson.body.question,
            referenceSentence: batchResponseJson.body.referenceSentence,
            example: {
                image: new PreloadableImageSrc(`${BACKEND_ROOT}${batchResponseJson.body.example.exampleImagePath}`)
            },
            samples: batchResponseJson.body.samples.map(sampleJson => ({
                id: sampleJson.id,
                studentId: sampleJson.studentId,
                image: new PreloadableImageSrc(`${BACKEND_ROOT}${sampleJson.resourceUrl}`),
                score: undefined
            })),
        }
        preloadBatchImages(batch).then(() => console.debug("Preload of batch finished"))
        return batch
    }
}