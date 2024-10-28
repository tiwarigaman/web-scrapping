document.getElementById('loadData').addEventListener('click', loadData);

function loadData() {
  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      const tbody = document.querySelector('#dataTable tbody');
      tbody.innerHTML = '';  // Clear previous data

      data.forEach((item, index) => {
        const row = `<tr>
          <td>${index + 1}</td>
          <td>${item.title}</td>
          <td>${item.price}</td>
          <td><a href="${item.link}" target="_blank">View</a></td>
        </tr>`;
        tbody.innerHTML += row;
      });
    })
    .catch(error => console.error('Error loading data:', error));
}
