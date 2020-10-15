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
      <h1>SHORTPANTS</h1>
      <h3>Here's your shortened URL!</h3>
      <p>${domain}${hash}</p>
    </body>
    </html>`;

    return template;
}

export default submittedView;
