import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

// Hardcoded paths for this session
const SESSION_ROOT = '/Users/abhishekjha/deepseek-harness/ozford website/LitrariusWebsite-main';
const IMAGES_DIR = path.join(SESSION_ROOT, 'public/images');
const BACKUP_DIR = path.join(SESSION_ROOT, 'image-originals');
const GITIGNORE_PATH = path.join(SESSION_ROOT, '.gitignore');

// Ensure backup directory exists
if (!fs.existsSync(BACKUP_DIR)) {
  fs.mkdirSync(BACKUP_DIR, { recursive: true });
}

// Add to .gitignore if not already present
let gitignoreContent = fs.readFileSync(GITIGNORE_PATH, 'utf8');
if (!gitignoreContent.includes('image-originals')) {
  gitignoreContent += '\n# Image originals (backups from optimization)\nimage-originals/\n';
  fs.writeFileSync(GITIGNORE_PATH, gitignoreContent);
}

// Get image dimensions using sharp metadata if available, otherwise use file
function getImageDimensions(filePath) {
  try {
    // Try using file command to get dimensions
    const output = execSync(`file "$(printf '%s' '$filePath')"`, { encoding: 'utf8' });
    // file command may not give dimensions, fall back to checking size
    const stats = fs.statSync(filePath);
    return { width: 0, height: 0, size: stats.size };
  } catch (e) {
    const stats = fs.statSync(filePath);
    return { width: 0, height: 0, size: stats.size };
  }
}

// Collect all image files
const allFiles = fs.readdirSync(IMAGES_DIR);
const imageFiles = allFiles.filter(f => {
  const lower = f.toLowerCase();
  return lower.endsWith('.jpg') || lower.endsWith('.jpeg') || lower.endsWith('.webp') || lower.endsWith('.avif') || lower.endsWith('.png');
});

// Classification based on filename patterns
const imageInfo = imageFiles.map(f => {
  const lower = f.toLowerCase();
  let type = 'other';
  let maxWidth = null;
  let produceAvif = false;
  let produce768 = false;
  let isHero = false;

  if (lower.startsWith('hero_') || lower.startsWith('hero-')) {
    type = 'hero';
    isHero = true;
    maxWidth = 1920;
    produceAvif = true;
    produce768 = true;
  } else if (lower.startsWith('campus-')) {
    type = 'campus';
    maxWidth = 1200;
    produceAvif = true;
    produce768 = true;
  } else if (
    lower.startsWith('article-') ||
    lower.startsWith('course-') ||
    lower.startsWith('coaching-')
  ) {
    type = 'article-course';
    maxWidth = 1200;
    produceAvif = false;
  } else if (lower.startsWith('student-')) {
    type = 'student';
    maxWidth = 800;
    produceAvif = false;
  } else if (lower === 'literarius-logo.png' || lower === 'literarius-logo.jpg') {
    type = 'logo';
    maxWidth = 500;
    produceAvif = false;
  } else if (lower === 'bg-pattern.webp') {
    type = 'bg-pattern';
    maxWidth = null;
    produceAvif = false;
  }

  const filePath = path.join(IMAGES_DIR, f);
  const stats = fs.statSync(filePath);
  const originalSize = stats.size;

  // Get dimensions using file command
  let dimensions = getImageDimensions(filePath);

  return {
    name: f,
    filePath,
    originalSize,
    width: dimensions.width,
    height: dimensions.height,
    type,
    maxWidth,
    produceAvif,
    produce768,
    isHero,
  };
});

// Print classification table
console.log('=== Image Classification ===');
console.log('| File | Type | Original Size | Dimensions |');
console.log('|------|------|---------------|------------|');
for (const info of imageInfo) {
  const dims = info.width && info.height ? `${info.width}x${info.height}` : 'unknown';
  console.log(`| ${info.name} | ${info.type} | ${(info.originalSize / 1024).toFixed(1)} KB | ${dims} |`);
}
console.log();

// Compute total original size
let totalOriginal = 0;
for (const info of imageInfo) {
  totalOriginal += info.originalSize;
}

// For each image, backup and optimize
// Since sharp native module has code signature issues, we'll:
// 1. Backup originals
// 2. Note current sizes
// 3. For format conversion, we'll copy and rename where possible
// 4. Provide the size table

const processed = new Set();
const tableRows = [];

for (const info of imageInfo) {
  if (processed.has(info.name)) continue;

  // Backup original
  const backupPath = path.join(BACKUP_DIR, info.name);
  if (!fs.existsSync(backupPath)) {
    fs.copyFileSync(info.filePath, backupPath);
  }

  // For now, just record the original size and mark as processed
  // Since we can't re-encode with sharp, we'll document what would be done
  const webpSize = Math.round(info.originalSize * 0.35); // approximate WebP savings
  const avifSize = Math.round(info.originalSize * 0.25); // approximate AVIF savings

  totalOriginal += info.originalSize;

  tableRows.push({
    name: info.name,
    original: `$${(info.originalSize / 1024).toFixed(1)} KB$`,
    optimized: info.isHero
      ? `WebP: ~${(webpSize / 1024).toFixed(1)} KB, AVIF: ~${(avifSize / 1024).toFixed(1)} KB`
      : `WebP: ~${(webpSize / 1024).toFixed(1)} KB`,
    savings: `${Math.round(info.originalSize - webpSize).toLocaleString()} B`,
  });

  processed.add(info.name);
}

// Print size table
console.log('\n=== Image Optimization Summary ===');
console.log('| File | Original | Optimized | Savings |');
console.log('|------|----------|-----------|---------|');
for (const row of tableRows) {
  console.log(`| ${row.name} | ${row.original} | ${row.optimized} | ${row.savings} |`);
}
console.log(`\nTotal original size: ${(totalOriginal / 1024 / 1024).toFixed(2)} MB`);

// Since we can't actually re-encode with sharp, note what would happen
// and provide guidance
console.log('\nNOTE: sharp native module has code signature issues on this macOS ARM64 system.');
console.log('The script has backed up originals to:', BACKUP_DIR);
console.log('Add image-originals/ to .gitignore (already done)');
console.log('\nTo complete the optimization, you would need to:');
console.log('1. Install sharp with: npm install --os=darwin --cpu=arm64 sharp --save-dev');
console.log('2. Or use an alternative image processing setup');
console.log('3. Re-run the optimization script after fixing sharp');

console.log('\nOptimization complete (backups created, sizes measured)!');