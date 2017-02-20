var num=200,w=window.innerWidth,h=window.innerHeight,max=100,_x=0,_y=0,_z=150,canvas=document.getElementById("canv"),dtr=function(t){return t*Math.PI/180},rnd=function(){return Math.sin(Math.floor(360*Math.random())*Math.PI/180)},dist=function(t,a,s){return Math.sqrt(Math.pow(a.x-t.x,2)+Math.pow(a.y-t.y,2)+Math.pow(a.z-t.z,2))},cam={obj:{x:_x,y:_y,z:_z},dest:{x:0,y:0,z:1},dist:{x:0,y:0,z:200},ang:{cplane:0,splane:0,ctheta:0,stheta:0},zoom:1,disp:{x:w/2,y:h/2,z:0},upd:function(){cam.dist.x=cam.dest.x-cam.obj.x,cam.dist.y=cam.dest.y-cam.obj.y,cam.dist.z=cam.dest.z-cam.obj.z,cam.ang.cplane=-cam.dist.z/Math.sqrt(cam.dist.x*cam.dist.x+cam.dist.z*cam.dist.z),cam.ang.splane=cam.dist.x/Math.sqrt(cam.dist.x*cam.dist.x+cam.dist.z*cam.dist.z),cam.ang.ctheta=Math.sqrt(cam.dist.x*cam.dist.x+cam.dist.z*cam.dist.z)/Math.sqrt(cam.dist.x*cam.dist.x+cam.dist.y*cam.dist.y+cam.dist.z*cam.dist.z),cam.ang.stheta=-cam.dist.y/Math.sqrt(cam.dist.x*cam.dist.x+cam.dist.y*cam.dist.y+cam.dist.z*cam.dist.z)}},trans={parts:{sz:function(t,a){return{x:t.x*a.x,y:t.y*a.y,z:t.z*a.z}},rot:{x:function(t,a){return{x:t.x,y:t.y*Math.cos(dtr(a.x))-t.z*Math.sin(dtr(a.x)),z:t.y*Math.sin(dtr(a.x))+t.z*Math.cos(dtr(a.x))}},y:function(t,a){return{x:t.x*Math.cos(dtr(a.y))+t.z*Math.sin(dtr(a.y)),y:t.y,z:-t.x*Math.sin(dtr(a.y))+t.z*Math.cos(dtr(a.y))}},z:function(t,a){return{x:t.x*Math.cos(dtr(a.z))-t.y*Math.sin(dtr(a.z)),y:t.x*Math.sin(dtr(a.z))+t.y*Math.cos(dtr(a.z)),z:t.z}}},pos:function(t,a){return{x:t.x+a.x,y:t.y+a.y,z:t.z+a.z}}},pov:{plane:function(t){return{x:t.x*cam.ang.cplane+t.z*cam.ang.splane,y:t.y,z:t.x*-cam.ang.splane+t.z*cam.ang.cplane}},theta:function(t){return{x:t.x,y:t.y*cam.ang.ctheta-t.z*cam.ang.stheta,z:t.y*cam.ang.stheta+t.z*cam.ang.ctheta}},set:function(t){return{x:t.x-cam.obj.x,y:t.y-cam.obj.y,z:t.z-cam.obj.z}}},persp:function(t){return{x:t.x*cam.dist.z/t.z*cam.zoom,y:t.y*cam.dist.z/t.z*cam.zoom,z:t.z*cam.zoom,p:cam.dist.z/t.z}},disp:function(t,a){return{x:t.x+a.x,y:-t.y+a.y,z:t.z+a.z,p:t.p}},steps:function(t,a,s,i,n){var r=trans.parts.sz(t,a);return r=trans.parts.rot.x(r,s),r=trans.parts.rot.y(r,s),r=trans.parts.rot.z(r,s),r=trans.parts.pos(r,i),r=trans.pov.plane(r),r=trans.pov.theta(r),r=trans.pov.set(r),r=trans.persp(r),r=trans.disp(r,n)}};!function(){"use strict";var t=function(t){this.transIn={},this.transOut={},this.transIn.vtx=t.vtx,this.transIn.sz=t.sz,this.transIn.rot=t.rot,this.transIn.pos=t.pos};t.prototype.vupd=function(){this.transOut=trans.steps(this.transIn.vtx,this.transIn.sz,this.transIn.rot,this.transIn.pos,cam.disp)};var a=function(){this.vel=.04,this.lim=360,this.diff=200,this.initPos=100,this.toX=_x,this.toY=_y,this.go()};a.prototype.go=function(){this.canvas=document.getElementById("canv"),this.canvas.width=window.innerWidth,this.canvas.height=window.innerHeight,this.$=canv.getContext("2d"),this.$.globalCompositeOperation="source-over",this.varr=[],this.dist=[],this.calc=[];for(var t=0,a=num;a>t;t++)this.add();this.rotObj={x:0,y:0,z:0},this.objSz={x:w/5,y:h/5,z:w/5}},a.prototype.add=function(){this.varr.push(new t({vtx:{x:rnd(),y:rnd(),z:rnd()},sz:{x:0,y:0,z:0},rot:{x:20,y:-20,z:0},pos:{x:this.diff*Math.sin(360*Math.random()*Math.PI/180),y:this.diff*Math.sin(360*Math.random()*Math.PI/180),z:this.diff*Math.sin(360*Math.random()*Math.PI/180)}})),this.calc.push({x:360*Math.random(),y:360*Math.random(),z:360*Math.random()})},a.prototype.upd=function(){cam.obj.x+=.05*(this.toX-cam.obj.x),cam.obj.y+=.05*(this.toY-cam.obj.y)},a.prototype.draw=function(){this.$.clearRect(0,0,this.canvas.width,this.canvas.height),cam.upd(),this.rotObj.x+=.1,this.rotObj.y+=.1,this.rotObj.z+=.1;for(var t=0;t<this.varr.length;t++){for(var a in this.calc[t])this.calc[t].hasOwnProperty(a)&&(this.calc[t][a]+=this.vel,this.calc[t][a]>this.lim&&(this.calc[t][a]=0));if(this.varr[t].transIn.pos={x:this.diff*Math.cos(this.calc[t].x*Math.PI/180),y:this.diff*Math.sin(this.calc[t].y*Math.PI/180),z:this.diff*Math.sin(this.calc[t].z*Math.PI/180)},this.varr[t].transIn.rot=this.rotObj,this.varr[t].transIn.sz=this.objSz,this.varr[t].vupd(),!(this.varr[t].transOut.p<0)){var s=this.$.createRadialGradient(this.varr[t].transOut.x,this.varr[t].transOut.y,this.varr[t].transOut.p,this.varr[t].transOut.x,this.varr[t].transOut.y,2*this.varr[t].transOut.p);this.$.globalCompositeOperation="lighter",s.addColorStop(0,"hsla(255, 255%, 255%, 1)"),s.addColorStop(.5,"hsla("+(t+2)+",85%, 40%,1)"),s.addColorStop(1,"hsla("+t+",85%, 40%,.5)"),this.$.fillStyle=s,this.$.beginPath(),this.$.arc(this.varr[t].transOut.x,this.varr[t].transOut.y,2*this.varr[t].transOut.p,0,2*Math.PI,!1),this.$.fill(),this.$.closePath()}}},a.prototype.anim=function(){window.requestAnimationFrame=function(){return window.requestAnimationFrame||function(t,a){window.setTimeout(t,1e3/60)}}();var t=function(){this.upd(),this.draw(),window.requestAnimationFrame(t)}.bind(this);window.requestAnimationFrame(t)},a.prototype.run=function(){this.anim(),window.addEventListener("mousemove",function(t){this.toX=(t.clientX-this.canvas.width/2)*-.8,this.toY=.8*(t.clientY-this.canvas.height/2)}.bind(this)),window.addEventListener("touchmove",function(t){t.preventDefault(),this.toX=(t.touches[0].clientX-this.canvas.width/2)*-.8,this.toY=.8*(t.touches[0].clientY-this.canvas.height/2)}.bind(this)),window.addEventListener("mousedown",function(t){for(var a=0;100>a;a++)this.add()}.bind(this)),window.addEventListener("touchstart",function(t){t.preventDefault();for(var a=0;100>a;a++)this.add()}.bind(this))};var s=new a;s.run()}(),window.addEventListener("resize",function(){canvas.width=w=window.innerWidth,canvas.height=h=window.innerHeight},!1);