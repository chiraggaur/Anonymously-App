import { Message } from "@/model/User";

export interface APIResponse {
  success: boolean;
  message: string;
  isAcceptingResponse?: boolean;
  messages?: Message;
}
