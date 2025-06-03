import {PreloadableImageSrc} from "../components/Image";
import {Me} from "../authentication/Login";
import {get} from "../authentication/io";
import {BACKEND_BATCH, BACKEND_ROOT} from "../constants/Urls";

type GetTaskBatchResponse = {
    state: string,
    body: BackendTaskBatch
}

type BackendTaskBatch = {
    userAnswerCounts: {
        submittedAnswersCount: number,
        pendingAnswersCount?: number
    },
    question: {
        id: number,
        description: string
    },
    example: {
        exampleImagePath: string
    },
    samplePairs: Array<{
        first: BackendSample,
        second: BackendSample
    }>
}

type BackendSample = {
    id: number,
    resourceUrl: string,
    referenceSentenceId: number | null,
    reports: any[] | null
}

export type UserAnswerCounts = {
    submittedAnswersCount: number,
    pendingAnswersCount?: number
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
export type Score = -1 | 0 | 1
export type Sample = {
    id: number
    image: PreloadableImageSrc
    score: Score | undefined
}
export type TaskBatch = {
    userAnswerCounts: UserAnswerCounts
    question: Question
    example: Example
    samples: Array<[Sample, Sample]>
}

async function preloadBatchImages(batch: TaskBatch) {
    await batch.example.image.load()
    for (const [sample1, sample2] of batch.samples) {
        await sample1.image.load();
        await sample2.image.load();
    }
}

export async function fetchRandomBatch(user: Me) {
    console.info(`Fetching batch for ${JSON.stringify(user)}`)

    console.log("Calling backend:", BACKEND_BATCH)
    const batchResponseJson = await get(BACKEND_BATCH) as GetTaskBatchResponse
    console.log("Successfully fetched batch:", batchResponseJson)

    if (batchResponseJson.state === "finished") { // batch is finished
        return null
    } else {
        const batch: TaskBatch = {
            userAnswerCounts: batchResponseJson.body.userAnswerCounts,
            question: batchResponseJson.body.question,
            example: {
                image: new PreloadableImageSrc(`${BACKEND_ROOT}${batchResponseJson.body.example.exampleImagePath}`)
            },
            samples: batchResponseJson.body.samplePairs.map(pair => ([
                {
                    id: pair.first.id,
                    image: new PreloadableImageSrc(`${BACKEND_ROOT}${pair.first.resourceUrl}`),
                    score: undefined
                },
                {
                    id: pair.second.id,
                    image: new PreloadableImageSrc(`${BACKEND_ROOT}${pair.second.resourceUrl}`),
                    score: undefined
                }
            ])),
        }
        console.log("batch:", batch)
        return batch
    }

}

