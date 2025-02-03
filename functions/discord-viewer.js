export default {
  async fetch(request) {
    const url = new URL(request.url);
    const discordUrl = url.searchParams.get("url");

    // Validate and Fetch the Content
    if (discordUrl && discordUrl.startsWith("https://cdn.discordapp.com/attachments/")) {
      try {
        const response = await fetch(discordUrl);
        const htmlContent = await response.text();

        // Serve the HTML content directly
        return new Response(htmlContent, {
          headers: { "Content-Type": "text/html" },
        });
      } catch (err) {
        return new Response("Failed to fetch the Discord file.", { status: 500 });
      }
    }

    // Redirect to the main site if invalid or no URL
    return Response.redirect("https://coolguy.cfd", 302);
  },
};
