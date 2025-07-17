import { NextResponse, type NextRequest } from "next/server";
import { TOKEN_NAME } from "./lib/settings";

function handleLocale(request: NextRequest, response: NextResponse): void {
  const acceptLanguage = request.headers.get("accept-language");
  if (acceptLanguage?.startsWith("pt")) {
    response.cookies.set("NEXT_LOCALE", "br");
  } else {
    response.cookies.set("NEXT_LOCALE", "en");
  }
}

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const authenticated = request.cookies.has(TOKEN_NAME);
  const pathname = request.nextUrl.pathname;

  handleLocale(request, response);

  if (authenticated && pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!authenticated && pathname.includes("/dashboard")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/", "/dashboard/:path*"],
};
