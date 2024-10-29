document.getElementById('scrapForm').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent page reload on form submission

  const url = document.getElementById('urlInput').value;
  const dataContainer = document.getElementById('data-container');
  const loading = document.getElementById('loading');

  // Clear previous data and show loading message
  dataContainer.innerHTML = '';
  loading.style.display = 'block';

  // Send POST request with user input
  fetch('https://scrapper-backend-800l.onrender.com/api/scrape', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url: url }),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      console.log("Scraped data:", data); // Log the entire data response
      loading.style.display = 'none'; // Hide loading message

      // Populate the data container with headings
      if (data.headings && data.headings.length > 0) {
        data.headings.forEach((heading, index) => {
          const item = document.createElement('div');
          item.classList.add('data-item');
          item.innerHTML = `<strong>${index + 1}. ${heading}</strong>`;
          dataContainer.appendChild(item);
        });
      }

      // Populate the data container with links
      if (data.links && data.links.length > 0) {
        data.links.forEach(link => {
          const item = document.createElement('div');
          item.classList.add('data-item');
          item.innerHTML = `<a href="${link}" target="_blank">${link}</a>`;
          dataContainer.appendChild(item);
        });
      }

      // Populate the data container with images
      if (data.images && data.images.length > 0) {
        data.images.forEach(imageUrl => {
          const item = document.createElement('div');
          item.classList.add('data-item');
          item.innerHTML = `<img src="${imageUrl}" alt="Scraped Image" />`;
          dataContainer.appendChild(item);
        });
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      loading.style.display = 'none'; // Hide loading message
      const errorMessage = document.createElement('div');
      errorMessage.classList.add('data-item');
      errorMessage.innerHTML = `<strong>Error:</strong> ${error.message}`;
      dataContainer.appendChild(errorMessage);
    });
}); // <-- Make sure this closing bracket exists
