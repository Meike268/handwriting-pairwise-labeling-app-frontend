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
            return "Buchstaben Abstand"
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

export default Feature