import { useRouter } from "expo-router";
import ApiDebugScreen from "@/src/screens/ApiDebugScreen";

export default function ApiDebugModal() {
  const router = useRouter();

  return <ApiDebugScreen onBack={() => router.back()} />;
}
