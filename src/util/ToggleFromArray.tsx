// 対象のvalueが配列に含まれているか判定し、追加または削除を行う。
export function toggleFromArray<T>(array: Array<T>, value: T): Array<T> {
    const newArray = (array || []).slice() as T[]
    const index = newArray.indexOf(value)
    index > -1 ? newArray.splice(index, 1) : newArray.push(value)
    return newArray
}