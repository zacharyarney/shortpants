const form = document.querySelector('.urlSubmitForm');
let formUrl = document.querySelector('.urlInput');
let hash = '';

// initial history state for back/forward buttons
// history.replaceState(
//   {
//     content: form.innerHTML,
//     title: document.title,
//     url: '/',
//   },
//   document.title,
//   '/'
// );

// back/forward through history state
// window.onpopstate = e => {
//   if (e.state) {
    // console.log(e.state);
    // history.replaceState(
    //   {
    //     content: e.state.content,
    //     title: e.state.title,
    //     url: e.state.url,
    //   },
    //   e.state.title
    // );
//     form.innerHTML = e.state.content;
//   }
// };

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
  formUrl = document.querySelector('.urlInput');

  submitForm(`${window.location.origin}/api/new`, { url: formUrl.value })
    .then(res => res.json())
    .then(json => {
      console.log(json);
      hash = json.hash;
      // This is a little slower and less efficient but I can't get history.pushState to work like I want
      // refreshing the submitted page breaks the stack
      window.location = `submitted/${hash}`;
      // history.pushState(
      //   {
      //     content: json.view,
      //     title: document.title,
      //     url: `/submitted/${hash}`,
      //   },
      //   document.title,
      //   `/submitted/${hash}`
      // );
    })
    .catch(e => console.error(e));
});
