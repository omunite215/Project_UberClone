import { neon } from "@neondatabase/serverless";

export async function POST(request: Request) {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const { firstName, lastName, email, phone, adhaarId, clerkId } =
      await request.json();

    if (!firstName || !lastName || !email || !clerkId || !phone || !adhaarId) {
      Response.json({ error: "Missing Required Fields" }, { status: 400 });
    }
    const response = await sql`INSERT INTO users(
    first_name,
    last_name,
    email,
    phone,
    adhaar_id,
    clerk_id
    )
    VALUES(
    ${firstName},
    ${lastName},
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
};


