import { getSession } from "next-auth/client";

export default async function redirectApi(req, res) {
  const session = await getSession({ req });
  if (!session) {
    res.redirect("/");
    return;
  }

  res.redirect(`/${session.user.name}`);
}
