"use server";

import { get } from "./common/util/fetch";

// export default async function getMe() {
//   const me = await fetch(`${API_URL}/users/me`, {
//     headers: { Cookies: cookies().toString() },
//   });
//   return me.json(); 
// }


export default async function getMe() {
  return get("users/me");
}
