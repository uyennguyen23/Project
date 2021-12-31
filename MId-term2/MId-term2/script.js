var apiUrl = "https://61ce76d17067f600179c5ed4.mockapi.io/newList"
async function getData(apiUrl) {
    return await fetch(apiUrl).then(res => res.json())
}


async function getNews( apiUrl) {
    let news = await getData(apiUrl)
    let html = document.getElementById('showNews')
    for (const datum of news) {
        let showTable =
            `<tr class="list_data">
            <td>${datum.id}</td>
            <td>${datum.title}</td>
            <td>${datum.author}</td>
            <td>${datum.createdAt}</td>
            <td><img src="${datum.urlImg}" alt="" style="width: 50px"></td>
            </tr>`
         html += showTable
    }
}
getNews(apiUrl)

async function addData() {
    let topic = document.getElementById('topic-name').value
    let title = document.getElementById('title-name').value
    let author = document.getElementById('author-name').value
    let des = document.getElementById('quoto').value
    let content = document.getElementById('descript').value
    let img = document.getElementById('imgLink')
    let news = createNews(topic , title, author , des, content , img)
    await postData(apiUrl, news)
}

async function postData(apiUrl, data) {
    const response = await fetch(apiUrl, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data)
    });
    return response.json();
}

function createNews(topic, title, author, des, content, img) {
    return {
        "topic": topic,
        "title": title,
        "author": author,
        "description": des,
        "content": content,
        "urlImg": img
    }

}