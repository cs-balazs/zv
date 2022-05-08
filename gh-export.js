process.stdin.setEncoding("utf8");
process.stdin.on("readable", () => {
  const input = process.stdin.read();

  if (input && !input.includes("inlineMath")) {
    process.stdout.write(
      input
        ?.replace(
          /\$\$(.*?)\$\$/g,
          (_, captured) =>
            `<img src="https://render.githubusercontent.com/render/math?math=${encodeURIComponent(
              captured
            )}" />`
        )
        ?.replace(
          /\$(.*?)\$/g,
          (_, captured) =>
            `<img src="https://render.githubusercontent.com/render/math?math=${encodeURIComponent(
              captured
            )}" />`
        )
    );
  } else if (!!input) {
    process.stdout.write(input);
  }
});
