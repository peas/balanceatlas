// Export authored SVG assets without opening a browser or reading browser state.
import {createRequire} from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
if(process.argv.includes('--help')||!process.argv[2]){console.log('Usage: node export_logo_kit.mjs OUTPUT_DIR MODULE_ROOT\nUses resvg and sharp from MODULE_ROOT to export the SVG manifest. Renders the authored vector boards without using a browser.');process.exit(0);}
const root=process.argv[2],require=createRequire(import.meta.url),modules=process.argv[3];
const {Resvg}=require(path.join(modules,'@resvg/resvg-js'));const sharp=require(path.join(modules,'sharp'));
const photoPath=path.join(root,'assets/training.webp');
const png=fs.existsSync(photoPath)?(await sharp(fs.readFileSync(photoPath)).png().toBuffer()).toString('base64'):'';
function compatible(source){return source.replace(/<svg /g,'<svg xmlns:xlink="http://www.w3.org/1999/xlink" ').replace(/ href=/g,' xlink:href=').replace(/data:image\/webp;base64,[A-Za-z0-9+/=]+/g,'data:image/png;base64,'+png).replace(/data:image\/svg\+xml;base64,([A-Za-z0-9+/=]+)/g,(_,b)=>'data:image/png;base64,'+new Resvg(compatible(Buffer.from(b,'base64').toString()),{font:{loadSystemFonts:false}}).render().asPng().toString('base64'));}
const jobs=JSON.parse(fs.readFileSync(path.join(root,'render-manifest.json')));
for(const job of jobs){const input=compatible(fs.readFileSync(path.join(root,job.file),'utf8'));const raster=new Resvg(input,{fitTo:{mode:'width',value:job.width},font:{loadSystemFonts:false}}).render();fs.writeFileSync(path.join(root,job.file.replace('.svg','.png')),raster.asPng());}
console.log(`Exported ${jobs.length} PNGs`);
