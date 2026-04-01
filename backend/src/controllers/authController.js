const axios = require("axios");
const jwt = require("jsonwebtoken");

exports.githubLogin = (req, res) => {
  const url = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${process.env.GITHUB_CALLBACK_URL}&scope=user,repo,workflow`;
  res.redirect(url);
};

exports.githubCallback = async (req, res) => {
  const { code } = req.query;
  if (!code)
    return res.status(400).json({ success: false, message: "No code" });

  try {
    const response = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      { headers: { accept: "application/json" } },
    );

    const accessToken = response.data.access_token;
    const userRes = await axios.get("https://github.com/user", {
      headers: { Authorization: `token ${accessToken}` },
    });

    const token = jwt.sign(
      {
        githubToken: accessToken,
        username: userRes.data.login,
        avatar: userRes.data.avatar_url,
        id: userRes.data.id,
      },
      process.env.SESSION_SECRET,
      { expiresIn: "24h" },
    );

    res.cookie("github_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.redirect(`${process.env.FRONTEND_URL}/editor`);
  } catch (error) {
    res.redirect(`${process.env.FRONTEND_URL}/login?error=auth_failed`);
  }
};

exports.getMe = (req, res) => {
  res.status(200).json({ success: true, user: req.user });
};

exports.logout = (req, res) => {
  res.clearCookie("github_token");
  res.status(200).json({ success: true });
};
