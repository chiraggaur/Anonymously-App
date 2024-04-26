import { DbConnect } from "@/lib/dbConnects";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request: Request) {
  await DbConnect();
  try {
    const { username, email, password } = await request.json();
  } catch (error) {
    console.log("Error registering user ", error);
    return Response.json(
      {
        success: false,
        message: "error registering user",
      },
      {
        status: 500,
      }
    );
  }
}
