const medias = {
  audio : false,
  video : {
    width: window.innerWidth,
    height: window.innerHeight,
    frameRate: 10
  }
};
const video  = document.getElementById("video");
const canvas = document.getElementById("canvas");
const ctx    = canvas.getContext("2d");

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || window.navigator.mozGetUserMedia;

navigator.getUserMedia(medias,(stream)=>{
  video.srcObject = stream;
  },(err)=>{
    window.alert('Error Occurred.');
    console.log(err);
  }
);
requestAnimationFrame(draw);
function draw() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.drawImage(video, 0, 0, window.innerWidth, window.innerHeight);
  requestAnimationFrame(draw);
}

function getVideoSources(callback) {
  if (!navigator.mediaDevices) {
    console.log("MediaStreamTrack");
    MediaStreamTrack.getSources((cams)=>{
      cams.forEach((c, i, a)=>{
        if (c.kind != 'video') return;
        callback({
          name: c.facing,
          id: c.id
        });
      });
    });
  } else {
    navigator.mediaDevices.enumerateDevices().then((cams)=>{
      cams.forEach((c, i, a)=>{
        console.log("mediaDevices", c);
        if (c.kind != 'videoinput') return;
        callback({
          name: c.label,
          id: c.deviceId
        });
      });
    });
  }
}

{
  let timer = 0;
   window.onresize = ()=>{
     if(timer > 0) clearTimeout(timer);
     timer = setTimeout(location.reload(), 200);
   };
}