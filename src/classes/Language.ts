import ru from "../lang/ru"
import zh from "../lang/zh"
import ua from "../lang/ua"
import pl from "../lang/pl"
import emoji from "../lang/emoji"

export default class Language {
    public lang: string
    public readonly languages: Array<Object> = []

    constructor(lang: string = "ru") {
        this.lang = lang
        this.languages = [ru, zh, ua, pl, emoji]
    }

    public readonly template = (): object => {
        for (let i = 0; i < this.languages.length; i++) {
            const lang = this.languages[i]
            const name = Object.keys(lang)[0]
            if (this.lang === name) {
                return lang[name]
            }
        }
    }
}
