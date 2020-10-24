function submittedView(hash: string) {
  const domain = 'localhost:5000/';
  const template = `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link
        rel="stylesheet"
        href="/css/index.css"
        media="screen"
        charset="UTF-8"
      />
      <title>SHORTPANTS</title>
    </head>
    <body>
      <div class="container">
        <h1>SHORTPANTS</h1>
        <div class="output">
          <label for="urlOutput">Here's your shortened URL!</label>
          <input class="outputUrlString" name="urlOutput" value="${domain}${hash}" readonly></input>
          <button class="copy">copy</button>
        </div>
      </div>
      <h1>SHORTPANTS</h1>
      <h3>Here's your shortened URL!</h3>
      <p>${domain}${hash}</p>
    </body>
    </html>`;

    return template;
}

export default submittedView;
