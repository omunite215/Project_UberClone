import { neon } from "@neondatabase/serverless";

export async function GET(request: Request, { id }: { id: string }) {
  try {
    const { searchParams } = new URL(request.url);
    const fields = searchParams.get("fields"); // Get the 'fields' query parameter

    if (!id) {
      return new Response(JSON.stringify({ error: "User ID is required" }), {
        status: 400,
      });
    }

    const sql = neon(`${process.env.DATABASE_URL}`);

    // Determine selected fields: 'fields' or default to '*'
    const selectedFields = fields
      ? fields
          .split(",")
          .map((field) => field.trim())
          .join(", ")
      : "*";

    // SQL query dynamically adjusts based on 'fields'
    const query = `
      SELECT ${selectedFields}
      FROM drivers
      WHERE clerk_id = $1
    `;

    const response = await sql(query, [id]);

    return new Response(JSON.stringify({ data: response }), { status: 200 });
  } catch (error) {
    // Check if error is an instance of Error
    if (error instanceof Error) {
      console.error(error.message); // Log the error message
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }

    // For unexpected error types, log a generic message
    console.error("An unexpected error occurred", error);
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred" }),
      { status: 500 }
    );
  }
}
