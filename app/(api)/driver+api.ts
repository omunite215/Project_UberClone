import { neon } from "@neondatabase/serverless";

export async function GET() {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const response = await sql`SELECT * FROM drivers`;
    return Response.json({ data: response });
  } catch (error) {
    console.error(error);
    return Response.json({ error: error });
  }
}

export async function POST(request: Request) {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const {
      firstName,
      lastName,
      email,
      adhaarId,
      drivingLicenseNo,
      vehicleNo,
      vehicleType,
      phone,
      clerkId,
    } = await request.json();

    if (
      !firstName ||
      !lastName ||
      !email ||
      !adhaarId ||
      !drivingLicenseNo ||
      !vehicleNo ||
      !vehicleType ||
      !phone ||
      !clerkId
    ) {
      Response.json({ error: "Missing Required Fields" }, { status: 400 });
    }
    const response = await sql`INSERT INTO drivers(
    first_name,
    last_name,
    email,
    phone,
    adhaar_id,
    driving_license_no,
    vehicle_no,
    vehicle_type,
    clerk_id
    )
    VALUES(
    ${firstName},
    ${lastName},
    ${email},
    ${phone},
    ${adhaarId},
    ${drivingLicenseNo},
    ${vehicleNo},
    ${vehicleType},
    ${clerkId}
    )
    `;

    return new Response(JSON.stringify({ data: response }), { status: 201 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: error }, { status: 500 });
  }
}
