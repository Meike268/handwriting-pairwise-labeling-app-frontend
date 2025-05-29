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
    }
    question: {
        id: number,
        description: string
    }
    example: {
        exampleImagePath: string
    }
    // list of sample tuples
    samples: Array<[
        sample1: BackendSample,
        sample2: BackendSample
    ]>
}

export type UserAnswerCounts = {
    submittedAnswersCount: number,
    pendingAnswersCount?: number
}

export type BackendSample = {
    id: number,
    resourceUrl: string,
    referenceSentenceId: number
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
    try {
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
                samples: batchResponseJson.body.samples.map(([sample1, sample2]) => ([
                {
                    id: sample1.id,
                    image: new PreloadableImageSrc(`${BACKEND_ROOT}${sample1.resourceUrl}`),
                    score: undefined
                },
                {
                    id: sample2.id,
                    image: new PreloadableImageSrc(`${BACKEND_ROOT}${sample2.resourceUrl}`),
                    score: undefined
                }
            ]))
                ,
            }
            preloadBatchImages(batch).then(() => console.debug("Preload of batch finished"))
            return batch
        }
    } catch (error) {
        console.error("Error fetching batch:", error);
    }
}

