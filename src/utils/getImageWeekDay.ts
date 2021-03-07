import { DateTime } from "luxon";

export default function (date: DateTime) {
    const weekDay = date.setLocale('ru').toFormat('E').toString()
    switch ( weekDay ) {
        case '1':
            return 'photo-147858640_457239352'
        case '2':
            return 'photo-147858640_457239351'
        case '3':
            return 'photo-147858640_457239354'
        case '4':
            return 'photo-147858640_457239356'
        case '5':
            return 'photo-147858640_457239353'
        case '6':
            return 'photo-147858640_457239355'
        case '7':
            return 'photo-147858640_457239350'
    }
}