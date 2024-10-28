document.getElementById('loadData').addEventListener('click', loadData);

function loadData() {
  fetch('https://scrapper-backend-800l.onrender.com/api/data')  // Ensure this endpoint is correct
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      console.log("Fetched data:", data);  // Log the entire data response
      const ul = document.querySelector('#data-container');
      ul.innerHTML = '';  // Clear old data

      // Populate the list with headings
      data.headings.forEach((heading, index) => {
        const listItem = `<li>${index + 1}: ${heading}</li>`;
        ul.innerHTML += listItem;
      });
    })
    .catch(error => console.error('Error fetching data:', error));
}
