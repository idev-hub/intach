export default function (arr: Array<any>, count: number = 5, limit: number = 10) {
    let subarray = []
    for ( let i = 0; i < Math.ceil(arr.length / count); i++ ) {
        subarray[i] = arr.slice((i * count), (i * count) + count)
    }
    return subarray.slice(0, limit)
}