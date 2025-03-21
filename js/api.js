function showLoader() {
    document.getElementById("loader").classList.remove("hidden")
    document.getElementById("lessonContainer").classList.add("hidden")
}
function hideLoader() {
    document.getElementById("loader").classList.add("hidden")
    document.getElementById("lessonContainer").classList.remove("hidden")
}

function loadLessonsButton() {
    fetch('https://openapi.programming-hero.com/api/levels/all')
        .then(res => res.json())
        .then(data => displayLessonButtons(data.data))
}
const displayLessonButtons = (level_no) => {
    showLoader()
    const lessonContainer = document.getElementById("lessonContainer")
    level_no.forEach(element => {
        const div = document.createElement('div')
        div.innerHTML = `
         <button id ="btn-${element.level_no}"  onclick ="loadlesson(${element.level_no})" class="btn btn-outline btn-primary"><i class="fa-brands fa-leanpub"></i>Lesson-${element.level_no}</button>
        `
        lessonContainer.appendChild(div)
    });
    hideLoader()
}

function loadWords() {
    fetch('https://openapi.programming-hero.com/api/words/all')
        .then(res => res.json())
        .then(data => displayWords(data.data))
}

const displayWords = (words) => {
    showLoader()
    const CardContainer = document.getElementById("CardContainer")
    CardContainer.innerHTML = ""
    if (words.length == 0) {
        const newDiv = document.createElement('div')
        newDiv.classList.add("col-span-full", "flex", "flex-col")
        newDiv.innerHTML = `
        <img class ="h-[96px] w-[96px] place-self-center col-span-full flex flex-col " src="./assets/alert-error.png" alt=""> 
        <p class="text-sm font-normal text-gray-400 text-center">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                <h1 class="text-4xl font-bold text-center">নেক্সট Lesson এ যান</h1>
        `
        CardContainer.append(newDiv)
        hideLoader()
        return
    }

    words.forEach(element => {
        const div = document.createElement('div')
        div.classList.add("bg-white", "p-6", "rounded-lg", "shadow-lg", "text-center")
        div.innerHTML = `
        <h2 class="text-xl font-bold mb-2">${element.word}</h2>
        <p class="text-gray-600 mb-4">Meaning / Pronunciation</p>
        <p class="text-lg font-medium text-gray-700 mb-4">${element.meaning == null ? `অর্থ নেই ` : `${element.meaning}`}/ ${element.pronunciation}</p>
        <div class="flex justify-around">
            <button onclick ="loadDetails(${element.id})" class="btn btn-sm"><i class="fa-solid fa-circle-info"></i></button>
            <button class="btn btn-sm"><i class="fa-solid fa-volume-high"></i></button>
            
        </div>
        `
        CardContainer.append(div)
    });
    hideLoader()
}

const loadlesson = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            removeActiveClass()
            const clickedBtn = document.getElementById(`btn-${id}`)
            clickedBtn.classList.add("active")
            displayWords(data.data)
        })
}
const loadDetails = (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            displayDetails(data.data)
        })
}

const displayDetails = (details) => {
    // console.log(details)
    showLoader()
    document.getElementById("video_details").showModal()
    const detailsContainer = document.getElementById("detailsContainer")
    detailsContainer.innerHTML = `
    <h3 class="text-lg font-bold">${details.word} (<i class="fa-solid fa-microphone"></i> :${details.pronunciation})</h3>
                    <p class="py-4 text-2xl"><span class="font-bold">Meaning:</span> <br>${details.meaning == null ? `<i class="fa-solid fa-triangle-exclamation"></i>No words found` : `${details.meaning}`}</p>
                    <p class="py-4 text-2xl"><span class="font-bold">Example:</span>${details.sentence}</p>
                    <p class="py-4 text-2xl"><span class="font-bold">Synonyms:</span></p>
                    <div class="py-4 space-x-2">
                        <button class="btn btn-outline">${details.synonyms[0] == undefined ? `Not found` : `${details.synonyms[0]}`}</button>
                        <button class="btn btn-outline">${details.synonyms[1] == undefined ? `Not found` : `${details.synonyms[1]}`}</button>
                        <button class="btn btn-outline">${details.synonyms[2] == undefined ? `Not found` : `${details.synonyms[2]}`}</button>
                    </div>
                    <div class="modal-action">
                        <form method="dialog">
                            <button class="btn btn-primary">Complete Learning</button>
                        </form>
                    </div>
    

    `
    hideLoader()
}

function hideMessage() {
    const select = document.getElementById("noLessonSelect")
    select.classList.add("hidden")
}

function removeActiveClass() {
    const activeButtons = document.getElementsByClassName("active")
    for (const btn of activeButtons) {
        btn.classList.remove("active")
    }
}

// loadWords()
loadLessonsButton()
document.getElementById("getStarted").addEventListener('click', (event) => {
    const name = document.getElementById("name").value
    if (!name) {
        alert("please enter your name")
        return
    }
    const password = parseInt(document.getElementById("password").value)
    if (password === 123456) {
        document.getElementById("hero-section").classList.add("hidden")
        document.getElementById("navbar").classList.remove("hidden")
        document.getElementById("main-section").classList.remove("hidden")
    }
    else {
        alert("incorrect name or password")
    }
})
document.getElementById("logout").addEventListener('click', (event) => {
    //const password = parseInt(document.getElementById("password").value)
    document.getElementById("hero-section").classList.remove("hidden")
    document.getElementById("navbar").classList.add("hidden")
    document.getElementById("main-section").classList.add("hidden")


})