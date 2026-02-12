import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';

// GET — Export data as CSV
export async function GET(request: NextRequest) {
  const table = request.nextUrl.searchParams.get('table');

  if (!table) {
    return NextResponse.json({ error: 'Table parameter required' }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin.from(table).select('*');

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!data || data.length === 0) {
    return new NextResponse('No data', { status: 204 });
  }

  // Convert to CSV
  const headers = Object.keys(data[0]);
  const csvRows = [
    headers.join(','),
    ...data.map((row) =>
      headers
        .map((header) => {
          const value = row[header];
          const str = typeof value === 'object' ? JSON.stringify(value) : String(value ?? '');
          return `"${str.replace(/"/g, '""')}"`;
        })
        .join(',')
    ),
  ];
  const csv = csvRows.join('\n');

  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${table}_export_${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
