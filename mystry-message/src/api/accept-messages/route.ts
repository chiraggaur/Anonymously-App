import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { DbConnect } from "@/lib/dbConnects";
import UserModel from "@/model/User";
import { User } from "next-auth";

export async function POST(request: Request) {
  await DbConnect();

  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "User Not Authenticated",
      },
      { status: 401 }
    );
  }
  const userId = user?._id;
  const { acceptMessage } = await request.json();
  try {
    const updatedUser = await UserModel.findById(
      userId,
      { isAcceptingMessage: acceptMessage },
      { new: true }
    );

    if (!updatedUser) {
      return Response.json(
        {
          success: true,
          message: "failed to update user status to accept messages",
        },
        { status: 401 }
      );
    }
    return Response.json(
      {
        success: false,
        message: "Message acceptance status updated successfully",
        updatedUser,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("failed to update user status to accept messages");
    return Response.json(
      {
        success: false,
        message: "failed to update user status to accept messages",
      },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  await DbConnect();

  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "User Not Authenticated",
      },
      { status: 401 }
    );
  }
  const userId = user?._id;
  try {
    const foundUser = await UserModel.findById(userId);

    if (!foundUser) {
      return Response.json(
        {
          success: false,
          message: "User Not Found",
        },
        { status: 404 }
      );
    }

    return Response.json(
      {
        success: true,
        isAcceptingMessages: foundUser.isAcceptingMessage,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error in getting message acceptance status");
    return Response.json(
      {
        success: false,
        message: "Error in getting message acceptance status ",
      },
      { status: 500 }
    );
  }
}