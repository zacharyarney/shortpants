const copyButton = document.querySelector('.copy');

function copy() {
  // Get the text field
  const outputUrlString = document.querySelector('.outputUrlString');

  // Select the text field
  outputUrlString.select();
  outputUrlString.setSelectionRange(0, 99999); // For mobile devices

  // Copy the text inside the text field
  document.execCommand('copy');
}

copyButton.addEventListener('click', copy);
