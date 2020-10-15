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

  return response;
}

form.addEventListener('submit', e => {
  e.preventDefault();
  console.log('ANYTHING');
  console.log(formUrl.value);
  submitForm('https://localhost:5000/api/new', { url: formUrl.value })
    .then(res => res)
    .then(data => {
      console.log(data);
      window.location = data.url;
    })
    .catch(e => console.log(e));
});
