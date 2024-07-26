export const BACKEND_ROOT = `${process.env.REACT_APP_BACKEND_URL_ROOT}`
export const BACKEND_LOGIN = `${BACKEND_ROOT}/users/login`
export const BACKEND_BATCH = `${BACKEND_ROOT}/batch`
export const BACKEND_ANSWER = `${BACKEND_ROOT}/answer`

export const APP_INDEX = "/"
export const APP_LOGIN = "/login"
export const APP_LOGOUT = "/logout"
export const APP_BATCH_LABELING_PATH = "/batchLabeling"
export const APP_BATCH_LABELING_START = APP_BATCH_LABELING_PATH + "/"
export const APP_BATCH_LABELING_SAMPLE = (sampleIndex: string | number) => `${APP_BATCH_LABELING_PATH}/${sampleIndex}`
