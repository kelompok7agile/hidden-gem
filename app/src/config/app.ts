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
    name: "Sample App",
    github: {
        title: "React Shadcn Starter",
        url: "https://github.com/hidayatfajar/react-shadcn-starter",
    },
    author: {
        name: "Fajar Hidayat",
        url: "https://github.com/hidayatfajar",
    }
}