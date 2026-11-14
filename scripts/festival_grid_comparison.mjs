// Compare the same nine IDs, ordering and 3:4 crops; do not regenerate source imagery.
import fs from 'node:fs/promises';
import sharp from 'sharp';
if(process.argv.includes('--help')){console.log('Usage: node scripts/festival_grid_comparison.mjs\nRun after festival_instagram_profile.mjs. Requires preserved grid-before.png. Writes before/after PNG masters and website WebP previews.');process.exit(0);}
const dir='design/instagram-publication-2026-11-14';
const pub='public/festival/ig/publication-comparison';
await fs.mkdir(pub,{recursive:true});
await fs.copyFile('design/instagram-profile-2026-11-14/grid-3x3.png',`${dir}/grid-after.png`);
for(const which of ['before','after'])await sharp(`${dir}/grid-${which}.png`).webp({quality:90}).toFile(`${pub}/grid-${which}.webp`);
const labels=Buffer.from('<svg width="2352" height="1830"><style>text{font-family:Arial;fill:#123d33;font-size:36px;font-weight:bold}</style><text x="20" y="55">ANTES</text><text x="1196" y="55">DEPOIS</text></svg>');
await sharp({create:{width:2352,height:1830,channels:4,background:'#f3eddf'}}).composite([{input:`${dir}/grid-before.png`,left:10,top:85},{input:`${dir}/grid-after.png`,left:1186,top:85},{input:labels}]).png().toFile(`${dir}/grid-before-after.png`);
console.log(`${dir}/grid-before-after.png`);
