import { useRouter } from "expo-router";
import LinkHandlerScreen from "@/src/screens/LinkHandlerScreen";

export default function LinkHandlerModal() {
  const router = useRouter();
  return <LinkHandlerScreen />;
}
