import { NextResponse } from "next/server";

export async function POST() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return NextResponse.json(
      { error: "GITHUB_TOKEN not configured" },
      { status: 500 }
    );
  }

  const res = await fetch(
    "https://api.github.com/repos/jerrysoer/scrolly-intel/actions/workflows/build-feed.yml/dispatches",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
      body: JSON.stringify({ ref: "main" }),
    }
  );

  if (!res.ok) {
    const body = await res.text();
    return NextResponse.json(
      { error: `GitHub API error: ${res.status}`, detail: body },
      { status: res.status }
    );
  }

  // 204 No Content = success
  return NextResponse.json({ status: "triggered" });
}
