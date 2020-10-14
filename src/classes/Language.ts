import ru from "../lang/ru"
import zh from "../lang/zh"


export default class Language {
    public lang: string
    public readonly ru: object
    public readonly zh: object

    constructor(context, lang?: string) {
        this.lang = lang ? lang : ((context.user) ? context.user.peer.lang : (context.session.lang ? context.session.lang : "ru")) || "ru"
        this.ru = ru
        this.zh = zh
    }

    public readonly template = (): object => {
        if (this.lang === "zh") return this.zh
        else return this.ru
    }
}
