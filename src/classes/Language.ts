import ru from "../lang/ru"
import zh from "../lang/zh"
import ua from "../lang/ua"

export default class Language {
    public lang: string
    public readonly ru: object
    public readonly zh: object
    public readonly ua: object

    constructor(context, lang?: string) {
        if(lang){
            this.lang = lang || "ru"
        } else {
            if(context.user && context.user.peer && context.user.peer.lang){
                this.lang = context.user.peer.lang || "ru"
            } else this.lang = "ru"
        }

        this.ru = ru
        this.zh = zh
        this.ua = ua
    }

    public readonly template = (): object => {
        if (this.lang === "zh") return this.zh
        else if (this.lang === "ua") return this.ua
        else return this.ru
    }
}
