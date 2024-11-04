import { neon } from "@neondatabase/serverless";

export async function POST(request: Request) {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const { name, email, phone, adhaarId, clerkId } = await request.json();

    if (!name || !email || !clerkId || !phone || !adhaarId) {
      Response.json({ error: "Missing Required Fields" }, { status: 400 });
    }
    const response = await sql`INSERT INTO users(
    name,
    email,
    phone,
    adhaar_id,
    clerk_id
    )
    VALUES(
    ${name},
    ${email},
    ${phone},
    ${adhaarId},
    ${clerkId}
    )
    `;

    return new Response(JSON.stringify({ data: response }), { status: 201 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: error }, { status: 500 });
  }
}
