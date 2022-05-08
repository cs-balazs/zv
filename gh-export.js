process.stdin.setEncoding("utf8");

let input = "";

process.stdin.on("readable", () => {
  const line = process.stdin.read();

  input += line;
});

process.stdin.on("close", () => {
  process.stdout.write(
    input
      .replace(
        /\$\$([^]+?)\$\$/g,
        (_, captured) =>
          `<img src="https://latex.codecogs.com/gif.latex?${encodeURIComponent(
            captured
          )}" />`
      )
      .replace(
        /\$(.+?)\$/g,
        (_, captured) =>
          `<img src="https://render.githubusercontent.com/render/math?math=${encodeURIComponent(
            captured
          )}" />`
      )
  );
});
