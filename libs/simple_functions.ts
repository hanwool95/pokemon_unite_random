export function unifiedStringToEmoji(unifiedText: string) {
  if (!unifiedText) return "";
  return String.fromCodePoint(
    Number(...unifiedText.split("-").map((u) => "0x" + u)),
  );
}
