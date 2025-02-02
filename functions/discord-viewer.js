export default {
  async fetch(request) {
    const url = new URL(request.url);
    const discordUrl = url.searchParams.get("url");

    // Validate the URL (only allow Discord CDN links)
    if (
      discordUrl &&
      discordUrl.startsWith("https://cdn.discordapp.com/attachments/")
    ) {
      return new Response(
        `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>CoolGuy Viewer</title>
            <style>
                body { font-family: Arial, sans-serif; text-align: center; }
                iframe { width: 90vw; height: 90vh; border: none; }
            </style>
        </head>
        <body>
            <h2>Loading file...</h2>
            <iframe src="${discordUrl}" allowfullscreen></iframe>
        </body>
        </html>`,
        { headers: { "Content-Type": "text/html" } }
      );
    }

    // If no valid Discord URL, redirect to the main site
    return Response.redirect("https://coolguy.cfd", 302);
  },
};
