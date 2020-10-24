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
      <link rel="stylesheet" href="https://use.typekit.net/qpd3zcs.css">
      <link rel="stylesheet" href="https://use.typekit.net/qpd3zcs.css">
      <script src="/js/submitted.js" async defer></script>
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
    </body>
    </html>`;

  return template;
}

export default submittedView;
