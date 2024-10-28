fetch('https://scrapper-backend-800l.onrender.com/api/data')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json();
  })
  .then(data => {
    console.log("Fetched data:", data);  // Log the entire data response
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
  })
  .catch(error => console.error('Error fetching data:', error));
