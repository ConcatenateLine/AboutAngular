module.exports = {
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
    testPathIgnorePatterns: [
        '<rootDir>/node_modules/',
        ".*\\.e2e\\.spec\\.ts$",
        ".*\\.funtional\\.spec\\.ts$",
    ],
    moduleNameMapper: {
        '^@app/(.*)$': '<rootDir>/src/app/$1',
        '^@shared/(.*)$': '<rootDir>/src/app/shared/$1',
        '^@features/(.*)$': '<rootDir>/src/app/features/$1'
    }
};
