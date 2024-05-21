enum Feature {
    SPACING = "letter_spacing",
    BASELINE = "baseline",
    INCLINATION = "inclination",
    ROUNDNESS = "roundness",
    HEIGHT = "height",
    CLOSED_FORMS = "closed_forms",
    NO_CORRECTIONS = "no_corrections",
    GENERAL_READABILITY = "general_readability",
}

export function as_human_readable(feature: Feature) {
    switch (feature) {
        case Feature.SPACING:
            return "Buchstabenabstand"
        case Feature.BASELINE:
            return "Einheitliche Grundlinie"
        case Feature.INCLINATION:
            return "Einheitliche Neigung"
        case Feature.ROUNDNESS:
            return "Runde Formen"
        case Feature.HEIGHT:
            return "Einheitliche Höhe/Tiefe"
        case Feature.CLOSED_FORMS:
            return "Geschlossene Formen"
        case Feature.NO_CORRECTIONS:
            return "Keine Korrekturen"
        case Feature.GENERAL_READABILITY:
            return "Lesbarkeit"
    }
}

export type FeatureRating = {
    [K in Feature]: number | undefined
}

export type RatingOption = {
    value: number,
    description: string
}

const spacingRatingOptions: RatingOption[] = [
    {value: 0, description: 'Abstand sehr ungleichmässig'},
    {value: 1, description: 'Abstand eher ungleichmässig'},
    {value: 2, description: 'Abstand leicht ungleichmässig'},
    {value: 3, description: 'Abstand eher gleichmässig'},
    {value: 4, description: 'Abstand sehr gleichmässig'},
]

const baselineRatingOptions: RatingOption[] = [
    {value: 0, description: 'Grundline nicht eingehalten'},
    {value: 1, description: 'Grundline eher nicht eingehalten'},
    {value: 2, description: 'Grundlinie teilweise nicht eingehalten'},
    {value: 3, description: 'Grundlinie grösstenteils eingehalten'},
    {value: 4, description: 'Grundlinie sehr gut eingehalten'},
]
const inclinationRatingOptions: RatingOption[] = [
    {value: 0, description: 'Neigung sehr ungleichmässig'},
    {value: 1, description: 'Neigung eher ungleichmässig'},
    {value: 2, description: 'Neigung teilweise ungleichmässig'},
    {value: 3, description: 'Neigung eher gleichmässig'},
    {value: 4, description: 'Neigung sehr gleichmässig'},
]
const roundnessRatingOptions: RatingOption[] = [
    {value: 0, description: 'Rundungen sehr ungleichmässig'},
    {value: 1, description: 'Rundungen eher ungleichmässig'},
    {value: 2, description: 'Rundungen leicht ungleichmässig'},
    {value: 3, description: 'Rundungen eher gleichmässig'},
    {value: 4, description: 'Rundungen sehr gleichmässig'},
]
const heightRatingOptions: RatingOption[] = [
    {value: 0, description: 'Höhe sehr ungleichmässig'},
    {value: 1, description: 'Höhe eher ungleichmässig'},
    {value: 2, description: 'Höhe leicht ungleichmässig'},
    {value: 3, description: 'Höhe eher gleichmässig'},
    {value: 4, description: 'Höhe sehr gleichmässig'},
]
const closedFormsRatingOptions: RatingOption[] = [
    {value: 0, description: 'Formenschluss sehr unsauber'},
    {value: 1, description: 'Formenschluss eher unsauber'},
    {value: 2, description: 'Formenschluss teilweise unsauber'},
    {value: 3, description: 'Formenschluss eher eindeutig'},
    {value: 4, description: 'Formenschluss sehr eindeutig'},
]
const noCorrectionsRatingOptions: RatingOption[] = [
    {value: 0, description: 'Sehr störende Korrekturen'},
    {value: 1, description: 'Störende Korrekturen'},
    {value: 2, description: 'Leicht störende Korrekturen'},
    {value: 3, description: 'Nicht störende Korrekturen'},
    {value: 4, description: 'Keine Korrekturen'},
]
const generalReadabilityRatingOptions: RatingOption[] = [
    {value: 0, description: 'Sehr schlecht lesbar / unleserlich'},
    {value: 1, description: 'Schlecht lesbar'},
    {value: 2, description: 'Lesbar'},
    {value: 3, description: 'Gut lesbar'},
    {value: 4, description: 'Sehr gut lesbar'},
]

export function getORatingOptions(feature: Feature) {
    switch (feature) {
        case Feature.SPACING:
            return spacingRatingOptions
        case Feature.BASELINE:
            return baselineRatingOptions
        case Feature.INCLINATION:
            return inclinationRatingOptions
        case Feature.ROUNDNESS:
            return roundnessRatingOptions
        case Feature.HEIGHT:
            return heightRatingOptions
        case Feature.CLOSED_FORMS:
            return closedFormsRatingOptions
        case Feature.NO_CORRECTIONS:
            return noCorrectionsRatingOptions
        case Feature.GENERAL_READABILITY:
            return generalReadabilityRatingOptions
    }
}

export default Feature