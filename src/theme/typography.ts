import { TextStyle } from "react-native";

export const typography = {
  display: { fontSize: 32, fontWeight: "700", letterSpacing: -0.5 } satisfies TextStyle,
  headline: { fontSize: 24, fontWeight: "700", letterSpacing: -0.25 } satisfies TextStyle,
  title: { fontSize: 20, fontWeight: "600" } satisfies TextStyle,
  body: { fontSize: 16, fontWeight: "400", lineHeight: 24 } satisfies TextStyle,
  bodySmall: { fontSize: 14, fontWeight: "400", lineHeight: 20 } satisfies TextStyle,
  label: { fontSize: 12, fontWeight: "500", letterSpacing: 0.4 } satisfies TextStyle,
  caption: { fontSize: 11, fontWeight: "400", letterSpacing: 0.2 } satisfies TextStyle,
} as const;
