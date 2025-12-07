//Dùng để kiểm tra ở server Next.js, xem có cookie không.
// Cái này dùng trong layout server component (app/layout.tsx) để xác định user hiện tại có đăng nhập không
import { cookies } from "next/headers";
import { AUTHENTICATION_COOKIE } from "../auth-cookie";
// import { NextRequest } from "next/server";

// export default function authenticated() {
//   // return !!cookies().get('Authentication')
//   return !!cookies().get(AUTHENTICATION_COOKIE)?.value; //Kết quả là true hoặc false.
// }
// export default function authenticated(request?: NextRequest) {
//   if (request) {
//     // Trường hợp dùng trong middleware
//     return !!request.cookies.get(AUTHENTICATION_COOKIE)?.value;
//   }

//   // Trường hợp dùng trong server component/layout.tsx
//   // @ts-expect-error - TypeScript của Next.js 15 nhận cookies() là async, nhưng thực tế ở server component nó sync
//   return !!cookies().get(AUTHENTICATION_COOKIE)?.value;
// }

export default function authenticated() {
  return !!cookies().get(AUTHENTICATION_COOKIE)?.value;
}
