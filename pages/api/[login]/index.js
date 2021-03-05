import { Client } from "pg";

export default async function (req, res) {
  const client = new Client(process.env.DATABASE_URL);
  await client.connect();
  const { rows } = await client.query({
    name: "get user data",
    text:
      "SELECT data FROM accounts WHERE user_id = (SELECT id FROM users WHERE name = $1)",
    values: [req.query.login],
  });

  if (rows.length === 0) {
    res.status(404).json({
      found: false,
    });
    return;
  }

  res.json({
    ...rows[0].data,
    found: true,
  });
}
