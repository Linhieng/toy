const myApi = a_api

const text1 = document.getElementById('text1')
const btn1 = document.getElementById('write-btn')
btn1.onclick = () => {
    myApi.writeFile(text1.value)
}

const text2 = document.getElementById('text2')
const btn2 = document.getElementById('read-btn')
btn2.onclick = async () => {
    text2.value = await myApi.readFile()
}