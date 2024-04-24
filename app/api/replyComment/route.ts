import { client } from "@/sanity/lib/sanity.client"
import { NextResponse } from "next/server"


export async function PATCH(request: Request) {
  try {
    const res = await request.json()
    await client
    .patch(res.id)
    .setIfMissing({replies: []})
    .append('replies', [res.mutations])
    .commit({autoGenerateArrayKeys: true})
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
  return NextResponse.json({ message: 'Comment submitted' }, { status: 200 })
}