const axios = require("axios");

exports.deployToGitHub = async (req, res) => {
  const { html, css, js } = req.body;
  const { githubToken, username } = req.user;
  const repoName = "portify-site";

  const headers = {
    Authorization: `token ${githubToken}`,
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "Portify-App",
  };

  try {
    try {
      await axios.post(
        "https://api.github.com/user/repos",
        { name: repoName, auto_init: true },
        { headers },
      );
    } catch (e) {}

    const indexContent = `<!DOCTYPE html><html><head><style>${css}</style></head><body>${html}<script>${js}</script></body></html>`;

    let sha;
    try {
      const file = await axios.get(
        `https://api.github.com/repos/${username}/${repoName}/contents/index.html`,
        { headers },
      );
      sha = file.data.sha;
    } catch (e) {}

    await axios.put(
      `https://api.github.com/repos/${username}/${repoName}/contents/index.html`,
      {
        message: "Deploy",
        content: Buffer.from(indexContent).toString("base64"),
        sha,
      },
      { headers },
    );

    try {
      await axios.post(
        `https://api.github.com/repos/${username}/${repoName}/pages`,
        { source: { branch: "main", path: "/" } },
        {
          headers: {
            ...headers,
            Accept: "application/vnd.github.switcheroo-preview+json",
          },
        },
      );
    } catch (e) {}

    res.status(200).json({
      success: true,
      url: `https://${username}.github.io/${repoName}/`,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
