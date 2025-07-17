export const BACKEND_ROOT = `${process.env.REACT_APP_BACKEND_URL_ROOT}`
export const BACKEND_LOGIN = process.env.REACT_APP_BACKEND_URL_ROOT || 'http://localhost:8080';
export const BACKEND_BATCH = `${BACKEND_ROOT}/batch`
export const BACKEND_ANSWER = `${BACKEND_ROOT}/answers`
export const BACKEND_REPORT = `${BACKEND_ROOT}/reports`


export const APP_INDEX = "/"
export const APP_LOGIN = "/login"
export const APP_LOGOUT = "/logout"
export const APP_BATCH_LABELING_PATH = "/batchLabeling"
export const APP_BATCH_LABELING_RESET = APP_BATCH_LABELING_PATH + "/"
export const APP_BATCH_LABELING_INTRO = APP_BATCH_LABELING_PATH + "/batchIntro"
export const APP_BATCH_LABELING_END = APP_BATCH_LABELING_PATH + "/batchEnd"
export const APP_BATCH_LABELING_SAMPLE = (sampleIndex: string | number) => `${APP_BATCH_LABELING_PATH}/${sampleIndex}`
export const APP_FINISHED = "/finished"
