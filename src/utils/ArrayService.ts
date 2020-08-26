export const unique = (arr: Array<string>) => {
    let result = [];

    for (let str of arr) {
        if (!result.includes(str)) {
            result.push(str)
        }
    }

    return result
}