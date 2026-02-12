import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';
import type { TableName } from '@/types';

const ALLOWED_TABLES: TableName[] = [
  'hero',
  'servizi',
  'progetti',
  'prodotti',
  'blog_posts',
  'preventivi',
  'site_settings',
];

function isAllowedTable(table: string): table is TableName {
  return ALLOWED_TABLES.includes(table as TableName);
}

// GET — Fetch all rows (with optional pagination)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ table: string }> }
) {
  const { table } = await params;

  if (!isAllowedTable(table)) {
    return NextResponse.json({ success: false, error: 'Tabella non valida' }, { status: 400 });
  }

  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '50');
  const orderBy = searchParams.get('orderBy') || 'created_at';
  const order = searchParams.get('order') === 'asc' ? true : false;

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, error, count } = await supabaseAdmin
    .from(table)
    .select('*', { count: 'exact' })
    .order(orderBy, { ascending: order })
    .range(from, to);

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, data, total: count, page, limit });
}

// POST — Insert new row
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ table: string }> }
) {
  const { table } = await params;

  if (!isAllowedTable(table)) {
    return NextResponse.json({ success: false, error: 'Tabella non valida' }, { status: 400 });
  }

  const body = await request.json();

  const { data, error } = await supabaseAdmin
    .from(table)
    .insert(body)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, data }, { status: 201 });
}

// PATCH — Update row
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ table: string }> }
) {
  const { table } = await params;

  if (!isAllowedTable(table)) {
    return NextResponse.json({ success: false, error: 'Tabella non valida' }, { status: 400 });
  }

  const body = await request.json();
  const { id, ...updates } = body;

  if (!id) {
    return NextResponse.json({ success: false, error: 'ID richiesto' }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from(table)
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, data });
}

// DELETE — Delete row
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ table: string }> }
) {
  const { table } = await params;

  if (!isAllowedTable(table)) {
    return NextResponse.json({ success: false, error: 'Tabella non valida' }, { status: 400 });
  }

  const { id } = await request.json();

  if (!id) {
    return NextResponse.json({ success: false, error: 'ID richiesto' }, { status: 400 });
  }

  const { error } = await supabaseAdmin.from(table).delete().eq('id', id);

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
