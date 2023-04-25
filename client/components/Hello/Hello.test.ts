import { describe, test, expect } from 'vitest'

// All tests within this suite will be run in parallel
describe('Test Hello', () => {
    test('One to be one', () => {
        expect(1).toBe(1)
    })
})
