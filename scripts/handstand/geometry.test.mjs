import assert from 'node:assert/strict';
import {angle,poseAt} from '../../src/festival/analysis/geometry.mjs';
const p=[[0,0,0,1],[0,1,0,1],[1,1,0,1]];
assert.equal(angle(p,0,1,2,1920,1080),90);
assert.equal(angle([[0,0,0,1],[.5,.5,0,1],[1,1,0,1]],0,1,2,720,1280),180);
assert.equal(angle(p,0,1,2,720,1280,1.1),null);
assert.equal(angle([p[0],p[0],p[2]],0,1,2,720,1280),null);
assert.equal(poseAt({quadros:[{t:0,pose:p},{t:.067}]},.03),null);
assert.equal(poseAt({quadros:[{t:0,pose:p},{t:1,pose:p}]},.5),null);
assert.equal(poseAt({quadros:[{t:1,pose:p}]},0),null);
console.log('geometry: aspect correction, visibility, degeneracy and missing frames passed');

assert.ok(Math.abs(angle([[1,0,0,1],[0,0,0,1],[.5,1,0,1]],0,1,2,200,100)-45)<1e-8);
