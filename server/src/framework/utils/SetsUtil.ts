
const equal = <T>(set1: Set<T>, set2: Set<T>): boolean => {
    return set1.size === set2.size
        && [...set1].every(el => set2.has(el))
}
