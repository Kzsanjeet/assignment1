const refreshButton = document.getElementById('refresh-button');
const quotesList = document.getElementById('quotes-list');
const quoteDetail = document.getElementById('quote-detail');

const fetchQuotes = async () => {
    try {
        const apiRes = await fetch('http://localhost:4000/api/quotes?count=10');
        const data = await apiRes.json();
        // console.log(data)
        // console.log(data.quotes)
        return data.quotes;
    } catch (error) {
        console.error('Error fetching quotes:', error);
    }
};

const displayQuotes = (data) => {
    quotesList.innerHTML = ''; // leaving it empty so that it will clear the existing quotes
    for (let i = 0; i < data.length; i++) {
        const listItem = document.createElement('li');
        listItem.textContent = data[i];
        listItem.addEventListener('click', () => {
            quoteDetail.textContent = data[i];
        });
        quotesList.appendChild(listItem); // appending it to quotelist
    }
};

const refreshQuotes = async () => {
    const data= await fetchQuotes();
    // console.log(data);
    if (data) {
        displayQuotes(data);
    } else {
        console.error('No quotes fetched or invalid data structure');
    }
};

refreshButton.addEventListener('click', () => {
    refreshQuotes(); // calling the refreshQoute function after clicking the refresh button
    quoteDetail.textContent = " "; 
});

// display the initial load
refreshQuotes();