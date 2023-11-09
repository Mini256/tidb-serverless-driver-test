import { NextRequest, NextResponse } from 'next/server';

import { connect } from "@tidbcloud/serverless";

export const runtime = 'edge';

// Set preferred Region to make the edge function execute on nodes
// in the same region of the database.
export const preferredRegion = 'pdx1';

const connection = connect({
    url: process.env.DATABASE_URL
});

export async function GET(req: NextRequest) {
    const rows = await connection.execute(`SELECT 1;`);

    return NextResponse.json(rows, {
        status: 200,
        headers: {
          'Cache-Control': 'max-age=60',
          'CDN-Cache-Control': 'max-age=300',
          'Vercel-CDN-Cache-Control': 'max-age=3600',
        }
    });
}