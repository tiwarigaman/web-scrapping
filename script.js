document.getElementById('loadData').addEventListener('click', loadData);

function loadData() {
  fetch('https://scrapper-backend-800l.onrender.com')  // Use your Render URL
    .then(response => response.json())
    .then(data => {
      const tbody = document.querySelector('#dataTable tbody');
      tbody.innerHTML = '';  // Clear old data

      data.headings.forEach((heading, index) => {
        const row = `<tr>
          <td>${index + 1}</td>
          <td>${heading}</td>
        </tr>`;
        tbody.innerHTML += row;
      });

      console.log("Links:", data.links);  // Display links in console for now
    })
    .catch(error => console.error('Error fetching data:', error));
}
