//prod
const BASE_URI = `https://api.plnews.live`
//dev
//const BASE_URI = `http://localhost:8090`


const getAll = async () => {
    const res = await fetch(BASE_URI + "/get-all", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return res
}
const generateStory = async (prompt) => {
    const res = await fetch(BASE_URI + "/generate", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt })
    })
    return res
}

const upvoteStory = async (id) => {
    const res = await fetch(BASE_URI + `/upvote/${id}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt })
    })
    return res
}

export { getAll, generateStory, upvoteStory }