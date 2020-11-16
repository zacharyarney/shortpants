const form = document.querySelector('.urlSubmitForm');
const formUrl = document.querySelector('.urlInput');

async function submitForm(url, data) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  // formUrl.value = '';

  return response;
}

form.addEventListener('submit', e => {
  e.preventDefault();
  submitForm('http://localhost:5000/api/new', { url: formUrl.value })
    .then(res => res)
    .then(data => {
      window.location = data.url;
    })
    .catch(e => console.error(e));
});
