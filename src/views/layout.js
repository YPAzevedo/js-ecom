module.exports = (content) => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <link href="https://fonts.googleapis.com/css2?family=Baloo+Tamma+2:wght@400;500;700&display=swap" rel="stylesheet">
    <style>
      * {
        padding:0;
        margin: 0;
        box-sizing: border-box;
        font-family: 'Baloo Tamma 2', sans-serif
      }

      html, body {
        height: 100vh;
      }

      #root {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    </style>
    <title>E-COMMERCE</title>
  </head>
  <body>
    <header>
      <span>🛒 My Store</span>
      <a href="/login">Login</a>
      <a href="/signup">Sign up</a>
    </header>
    <main id="root">
      ${content}
    </main>
  </body>
  </html>
`;
