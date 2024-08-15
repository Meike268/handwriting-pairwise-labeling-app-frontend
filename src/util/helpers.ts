export async function sleep(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

export type HighlightColor = {main: string, light: string}
export function getHighlightColorByQuestionId(questionId: number): HighlightColor {
    switch (questionId) {
        case 1:
            return {main: "#5c9200", light: "#d0ff81"}
        case 2:
            return {main: "#cf2600", light: "#ffac99"}
        case 3:
            return {main: "#1b5c92", light: "#96c5eb"}
        case 4:
            return {main: "#8f6400", light: "#ffcb4f"}
        default:
            return {main: "#5c9200", light: "#d0ff81"}
    }
}