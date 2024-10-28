document.getElementById('loadData').addEventListener('click', loadData);

function loadData() {
  fetch('https://scrapper-backend-800l.onrender.com/api/data')  // Use the correct API endpoint
    .then(response => {
      // Check if the response is okay
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      const tbody = document.querySelector('#dataTable tbody');
      tbody.innerHTML = '';  // Clear old data

      // Populate the table with headings
      data.headings.forEach((heading, index) => {
        const row = `<tr>
          <td>${index + 1}</td>
          <td>${heading}</td>
        </tr>`;
        tbody.innerHTML += row;
      });

      // Optionally, log the links to the console for now
      console.log("Links:", data.links);
    })
    .catch(error => console.error('Error fetching data:', error));
}
