// https://jacintodesign.github.io/quotes-api/data/quotes.json

const quoteContainer = document.getElementById("quote-container")
const quoteText = document.getElementById("quote")
const authorText = document.getElementById("author")
const twitterBtn = document.getElementById("twitter")
const newQuoteBtn = document.getElementById("new-quote")

const loader = document.getElementById("loader")

// get quotes from api
let apiQuotes = []

//show loader
function loading() {
    loader.hidden = false
    quoteContainer.hidden = true
}

//hide loading
function complete() {
    loader.hidden = true
    quoteContainer.hidden = false
}

// show new quote
function newQuote() {
    loading()
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
    
    // check if author field is blank
    quote.author === " " ? authorText.text = "Unknown" : authorText.textContent = quote.author
    
    // if quote is too long
    quote.text > 50 ? quoteText.classList.add("long-quote") : quoteText.classList.remove("long-quote")

    //set quote, hide loader
    quoteText.textContent = quote.text
    complete()
}

async function getQuotes() {
    loading()
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json'

    try {
        const response = await fetch(apiUrl)
        apiQuotes = await response.json()
        newQuote()
    } catch(error) {
        console.log("Oops... error")
    }
}

//tweet quote https://twitter.com/intent/tweet
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`

    window.open(twitterUrl, '_blank')
}

//event listeners
newQuoteBtn.addEventListener('click', newQuote)
twitterBtn.addEventListener('click', tweetQuote)

getQuotes()