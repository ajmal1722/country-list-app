export interface Country {
    name: {
        common: string
        official: string
    }

    flags: {
        png: string
        svg: string
        alt?: string
    }

    capital?: string[]
    region: string
    subregion?: string

    population: number

    languages?: {
        [key: string]: string
    }

    currencies?: {
        [key: string]: {
            name: string
            symbol?: string
        }
    }

    timezones: string[]
}