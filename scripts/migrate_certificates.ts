/**
 * Script to migrate existing certificates from storage to database
 *
 * Usage:
 * 1. Make sure you have your Supabase credentials set up in .env.local
 * 2. Run: npx tsx scripts/migrate_certificates.ts
 *
 * This script will:
 * - Fetch all files from the certificates bucket
 * - Create database records for files that don't have one
 * - Set display_order based on created_at (oldest first)
 */

import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';
import { CERTIFICATES_BUCKET_NAME } from '../src/utils/supabase/types';

// Load environment variables from .env.local
dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase credentials!');
  console.error('Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local');
  process.exit(1);
}

async function migrateCertificates() {
  // TypeScript doesn't know that we checked above, so we use non-null assertion
  const supabase = createSupabaseClient(supabaseUrl!, supabaseAnonKey!);

  console.log('Fetching certificates from storage...');

  // Get all files from storage
  const { data: files, error: storageError } = await supabase.storage.from(CERTIFICATES_BUCKET_NAME).list('');

  if (storageError) {
    console.error('Error fetching files from storage:', storageError);
    return;
  }

  if (!files || files.length === 0) {
    console.log('No files found in storage.');
    return;
  }

  console.log(`Found ${files.length} files in storage.`);

  // Get existing database records
  const { data: existingRecords } = await supabase.from('certificates').select('file_name');

  const existingFileNames = new Set(existingRecords?.map((r) => r.file_name) || []);

  // Sort files by created_at to assign order
  const sortedFiles = files.sort((a, b) => {
    const dateA = new Date(a.created_at).getTime();
    const dateB = new Date(b.created_at).getTime();
    return dateA - dateB; // Oldest first
  });

  // Get current max display_order
  const { data: maxOrderData } = await supabase
    .from('certificates')
    .select('display_order')
    .order('display_order', { ascending: false })
    .limit(1)
    .single();

  const nextOrder = (maxOrderData?.display_order ?? -1) + 1;

  // Insert new records
  const recordsToInsert = sortedFiles
    .filter((file) => !existingFileNames.has(file.name))
    .map((file, index) => ({
      file_name: file.name,
      display_order: nextOrder + index,
    }));

  if (recordsToInsert.length === 0) {
    console.log('All files already have database records.');
    return;
  }

  console.log(`Inserting ${recordsToInsert.length} new records...`);

  const { error: insertError } = await supabase.from('certificates').insert(recordsToInsert);

  if (insertError) {
    console.error('Error inserting records:', insertError);
    return;
  }

  console.log('✅ Migration completed successfully!');
  console.log(`Created ${recordsToInsert.length} database records.`);
}

migrateCertificates().catch(console.error);
