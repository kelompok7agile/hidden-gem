interface AppConfig {
    name: string,
    github: {
        title: string,
        url: string
    },
    author: {
        name: string,
        url: string
    },
}

export const appConfig: AppConfig = {
    name: "Hidden Gem",
    github: {
        title: "GitHub Repository",
        url: "https://github.com/kelompok7agile/hidden-gem",
    },
    author: {
        name: "Kelompok 7",
        url: "https://github.com/kelompok7agile",
    },
}