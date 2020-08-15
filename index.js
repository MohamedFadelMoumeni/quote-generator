// GET QUOTES FROM API
const qouteContainer = document.getElementById('quote-container');
const qouteTextElement = document.getElementById('quote');
const authorElement = document.getElementById('author');
const twitterButton = document.getElementById('twitter');
const newqouteButton = document.getElementById('new-qoute');
const loader = document.querySelector('.loader');
function showLoadingSpinner() {
    loader.hidden = false;
    qouteContainer.hidden = true;

}
function removeLoadingSpinner() {
    if (!loader.hidden) {
        qouteContainer.hidden = false;
        loader.hidden = true;
    }
}

// Fetch data from the API
async function getQuote() {
    showLoadingSpinner();
    const proxyUrl = 'http://cors-anywhere.herokuapp.com/';
    const apiUrl = 'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const fetchData = await fetch(proxyUrl + apiUrl);
        const response = await fetchData.json();
        const { quoteText, quoteAuthor } = response;
        if (quoteText.length > 110) {
            qouteTextElement.classList.add('long-quote');
        } else {
            qouteTextElement.classList.remove('long-quote');
        }

        if (quoteAuthor === '') {
            authorElement.textContent = "Unknown";
        } else {
            authorElement.textContent = quoteAuthor;
        }
        qouteTextElement.textContent = quoteText;
        removeLoadingSpinner();

    } catch (e) {
        getQuote();
        console.log("error");
    }
}
// Tweet the qoute
function TweetQoute() {
    const quote = qouteTextElement.textContent;
    const author = authorElement.textContent;
    let twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, 'blank');
}

newqouteButton.addEventListener('click', getQuote);
twitterButton.addEventListener('click', TweetQoute);
//Load
getQuote();
