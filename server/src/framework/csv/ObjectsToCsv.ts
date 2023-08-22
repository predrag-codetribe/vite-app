
export const objectsToCsv = (objects: Record<string, unknown>[]): string => {
    // Extract all unique keys from the objects
    const keys = Array.from(
        objects.reduce((keysSet, obj) => {
            Object.keys(obj).forEach((key) => keysSet.add(key))
            return keysSet
        }, new Set<string>()),
    )

    // Prepare CSV header
    const header = keys
        .map(wrapInQuotes)
        .join(',') + '\n'

    // Prepare CSV rows
    const rows = objects.map((obj) => {
        const row = keys
            .map(key => obj[key] || '')
            .map(wrapInQuotes)
            .join(',')
        return row
    })

    // Combine header and rows
    const csvData = header + rows.join('\n')

    return csvData
}

const wrapInQuotes = (input: unknown) => `"${input}"`
