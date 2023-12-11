// pages/api/images.js
// import fs from "fs";
// import { NextResponse } from "next/server";
// import path from "path";

// export async function GET(request: Request) {
//   const categories = ["attacker", "balance", "defence", "speeder", "support"];
//   const basePath = path.join(process.cwd(), "public/playable");

//   const images = {};

//   for (const category of categories) {
//     const dirPath = path.join(basePath, category);
//     console.log(dirPath);
//     const files = fs.readdirSync(dirPath);
//     images[category] = files.map((file) => `/playable/${category}/${file}`);
//   }

//   return NextResponse.json({ data: images });
// }

// pages/api/images.js
import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";

export type Categories =
  | "attacker"
  | "balance"
  | "defence"
  | "speeder"
  | "support";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const basePath = path.join(process.cwd(), "public/playable");

  if (category) {
    const dirPath = path.join(basePath, category);
    const files = fs.readdirSync(dirPath);
    const images = files.map((file) => `/playable/${category}/${file}`);
    return NextResponse.json(images);
  }
  return NextResponse.json({ data: "none" });
}
