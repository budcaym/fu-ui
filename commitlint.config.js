/* module.exports = {
    extends: ["gitmoji"],
    "subject-case": "sentence-case",
    parserPreset: {
        parserOpts: {
            headerPattern: /^(:\w*:)(?:\s)(?:\((.*?)\))?\s((?:.*(?=\())|.*)(?:\(#(\d*)\))?/,
            headerCorrespondence: ["type", "scope", "subject", "ticket"],
        },
    },
}
 */
module.exports = {
    extends: ['@commitlint/config-conventional']
}