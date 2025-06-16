import axios from "axios";

export async function POST(request) {
  const body = await request.json();
  const { username, password } = body;
  const authUrl =
    "https://auth1.diu.edu.bd/realms/diu-student/protocol/openid-connect/token";
  try {
    const response = await axios.post(
      authUrl,
      new URLSearchParams({
        grant_type: "password",
        client_id: "student-portal-ui",
        username,
        password,
      }),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );
    return new Response(
      JSON.stringify({ accessToken: response.data.access_token }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: "Authentication failed" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }
}
