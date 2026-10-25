import ffmpeg from 'ffmpeg-static';
import {spawnSync} from 'node:child_process';
import fs from 'node:fs';
fs.mkdirSync('assets/media',{recursive:true});
for(const name of ['city','rain']) {
 const start=name==='city'?12:2;
 for(const [suffix,width,crf] of [['desktop',1920,25],['mobile',960,27]]) {
  // End blends into the first second; the next loop resumes at second one.
  const filter=`[0:v]scale=${width}:-2,fps=24,split=2[a][b];[a]trim=start=1:end=17,setpts=PTS-STARTPTS[body];[b]trim=start=0:end=1,setpts=PTS-STARTPTS[head];[body][head]xfade=transition=fade:duration=1:offset=15,format=yuv420p[out]`;
  const r=spawnSync(ffmpeg,['-y','-ss',String(start),'-t','17','-i',`.cache/raw/${name}.mp4`,'-filter_complex',filter,'-map','[out]','-an','-c:v','libx264','-preset','fast','-crf',String(crf),'-pix_fmt','yuv420p','-movflags','+faststart',`assets/media/${name}-${suffix}.mp4`],{encoding:'utf8'});
  if(r.status!==0)throw Error(r.stderr);console.log(name,suffix,fs.statSync(`assets/media/${name}-${suffix}.mp4`).size);
 }
 for(const [suffix,width] of [['poster',1600],['poster-mobile',720]]) {
 const r=spawnSync(ffmpeg,['-y','-ss',String(start+1),'-i',`.cache/raw/${name}.mp4`,'-frames:v','1','-vf',`scale=${width}:-2`,'-quality','82',`assets/media/${name}-${suffix}.webp`],{encoding:'utf8'});if(r.status!==0)throw Error(r.stderr);
 }
 spawnSync(ffmpeg,['-y','-i',`.cache/raw/${name}.mp4`,'-vf','fps=1/5,scale=480:-2,tile=3x2','-frames:v','1',`.cache/${name}-contact.jpg`]);
}
