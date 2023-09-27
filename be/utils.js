const { OpenAI } = require('openai')
const mysql = require('mysql2')
const dotenv = require('dotenv')

dotenv.config()

const openAiKey = process.env.OPENAI_API_KEY
const aiClient = new OpenAI({ apiKey: openAiKey })

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER_NAME,
    password: process.env.PASSWORD,
    database: process.env.DB,
})

const generateStory = async (prompt) => {
    try {
        const result = await aiClient.completions.create({
            model: "text-davinci-003",
            prompt,
            max_tokens: 400,
            stop: null,
            temperature: 0.7,
            n: 1
        })
        const response = result.choices[0].text
        console.log(response)
        return response
    } catch (error) {
        return error
    }
}

module.exports = { generateStory, openAiKey, connection }