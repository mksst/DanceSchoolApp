export interface userConfig {
    login: string
    password?: string
    name: string
    phone: string
    email: string
    accountType: "user" | "admin" | "coach"
}

export const users: userConfig[] = [
    {
        login: "admin",
        password: "admin",
        name: "Александр",
        phone: "+7(929)000-00-01",
        email: "alex@gmail.com",
        accountType: "admin",
    },
]
