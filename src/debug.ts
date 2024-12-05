export default function debug(...args: any[]) {
  console.debug(
    ...args
      .map((a, idx) =>
        Array.isArray(a)
          ? a.map((a) => (typeof a === "boolean" ? (a ? 1 : 0) : a)).join(" ")
          : a,
      )
      .map((a, idx) =>
        [a, Array.isArray(args[idx]) ? " ".repeat(36 - a.length) : ""].join(""),
      ),
  );
}
