import axios from "axios";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const accessToken = searchParams.get("accessToken");
  // Remove semesterId, we will fetch only for semesters from the graph endpoint
  // const semesterId = searchParams.get("semesterId");
  const graphUrl =
    "https://gateway7.diu.edu.bd/api/student/portal/result/graph";
  const resultUrlBase =
    "https://gateway7.diu.edu.bd/api/student/portal/result/semester";
  try {
    // 1. Fetch the list of semesters and SGPA
    const graphResponse = await axios.get(graphUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
        Origin: "https://studentportal.diu.edu.bd",
        Referer: "https://studentportal.diu.edu.bd/",
      },
    });
    const semesters = graphResponse.data;
    // 2. For each semester, extract the year and season, then build semesterId
    const seasonMap = { Spring: 1, Summer: 2, Fall: 3 };
    const semesterResults = [];
    for (const sem of semesters) {
      // sem.semester is like "Fall, 2021"
      const [seasonStr, yearStr] = sem.semester.split(", ");
      const season = seasonMap[seasonStr.trim()];
      const year = yearStr.trim().slice(-2); // last two digits
      const semesterId = parseInt(`${year}${season}`);
      // 3. Fetch the detailed result for this semesterId
      try {
        const response = await axios.get(
          `${resultUrlBase}?semesterId=${semesterId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              Accept: "application/json",
              Origin: "https://studentportal.diu.edu.bd",
              Referer: "https://studentportal.diu.edu.bd/",
            },
          }
        );
        semesterResults.push({
          semester: sem.semester,
          sgpa: sem.sgpa,
          semesterId,
          data: response.data,
        });
      } catch (err) {
        semesterResults.push({
          semester: sem.semester,
          sgpa: sem.sgpa,
          semesterId,
          error: `Failed to fetch results for semester ${semesterId}`,
        });
      }
    }
    return new Response(JSON.stringify(semesterResults), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: `Failed to fetch semester graph or results` }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
