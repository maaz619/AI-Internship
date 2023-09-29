const express = require('express')
const morgan = require('morgan')
const { generateStory } = require('./utils')
const { connection } = require('./utils')

const app = express()

app.use(morgan("dev"))
app.use(express.json())

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "https://ai-internship.netlify.app");
    res.header('Access-Control-Allow-Methods', 'GET, POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Origin, X-Requested-With, Accept');

    if (req.method === 'OPTIONS') {
        // Preflight request (OPTIONS) response
        return res.status(200).end();
    }

    next();
});

app.get('/', (req, res) => {
    res.send("Welcome to AI api!")
})

app.post('/upvote/:id', async (req, res) => {
    const id = req.params.id
    try {
        let sql = `UPDATE stories SET upvotes = upvotes + 1 WHERE id = ?`
        connection.query(sql, [id], (err, result) => {
            if (err) {
                return res.status(400).send(err)
            }
            return res.status(200).send({ status: "success", result })
        })
    } catch (error) {
        return res.status(500).send(error)
    }
})

app.post('/create-table', (req, res) => {
    try {
        const { name } = req.query
        let sql = `CREATE TABLE ${name} (id INT AUTO_INCREMENT PRIMARY KEY, prompts VARCHAR(255), stories TEXT, upvotes INT)`
        connection.query(sql, (err, result) => {
            if (err) return res.status(400).send(err)
            return res.status(200).send("Table created")
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
})

// app.post('/create', (req, res) => {
//     const { prompt, story, upvote } = req.body
//     try {
//         connection.query("INSERT INTO stories (prompts,stories,upvotes) VALUES (?,?,?)", [prompt, story, upvote], (err, results, fields) => {
//             if (err) {
//                 return res.status(400).send(err)
//             }
//             return res.status(200).send(results)
//         })
//     } catch (error) {
//         console.log(error)
//         return res.status(500).send(error)
//     }
// })

app.post('/generate', async (req, res) => {

    const { prompt } = req.body
    const newPrompt = `Generate a story in 200 word on: ${prompt}`

    try {
        if (!prompt) throw new Error("No prompt was given")
        const response = await generateStory(newPrompt)
        if (response.status > 400)
            return res.status(400).send({ result: response.error.message })
        connection.query("INSERT INTO stories (prompts,stories,upvotes) VALUES (?,?,?)", [prompt, response, 0], (err, results, fields) => {
            if (err) {
                return res.status(400).send(err)
            }
            return res.status(200).send({ result: response })
        })
    } catch (error) {
        return res.send(error.message)
    }
})

app.get('/get-trending', (req, res) => {
    try {
        let sql = `SELECT * FROM stories ORDER BY upvotes DESC LIMIT 5;`
        connection.query(sql, (err, result) => {
            if (err) {
                return res.status(400).send(err.stack)
            }
            return res.status(200).send(result)
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
})
app.get('/get-all', (req, res) => {
    try {
        let sql = `SELECT * FROM stories`
        connection.query(sql, (err, result) => {
            if (err) {
                return res.status(400).send(err.stack)
            }
            return res.status(200).send(result)
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
})

module.exports = app