function submittedView(domain: string, hash: string) {
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
      <div class="dots-container-container">
        <div class="dots-container">
          <div class="stripes"></div>
          <div class="dots"></div>
        </div>
      </div>
      <div class="container">
        <div class="content">
          <h1>SHORTPANTS</h1>
          <div class="output">
            <label for="urlOutput">Here's your shortened URL!</label>
            <input class="outputUrlString" name="urlOutput" value="${domain}${hash}" readonly></input>
            <button class="copy">copy</button>
          </div>
        </div>
        <footer>
          <a
            href="https://github.com/zacharyarney/shortpants"
            class="github-link"
          >
            <img
              src="/img/GitHub-Mark-32px.png"
              alt="GitHub logo"
              class="github-logo"
            />
            <p class="github-text">GitHub</p>
          </a>
        </footer>
      </div>
    </body>
    </html>`;

  return template;
}

export default submittedView;
