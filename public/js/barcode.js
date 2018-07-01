class Camera {
  constructor(){
    this.video  = document.getElementById("video");
    this.medias = {
      audio : false,
      video : {
        frameRate: 10
      }
    };
  }
  init(cameraID){
    this.medias.video.width = window.innerWidth;
    this.medias.video.height = window.innerHeight;
    this.medias.video.deviceId = {exact: cameraID};

    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || window.navigator.mozGetUserMedia;
  
    navigator.getUserMedia(this.medias,(stream)=>{
      this.video.srcObject = stream;
    },(err)=>{
      window.alert('Error Occurred.');
      console.error(err);
    });
    requestAnimationFrame(canvasDraw);
  }
  end(callback){
    this.video.srcObject = null;
    if(callback != undefined){
      callback();
    }
  }
}

function canvasDraw(){
  const video  = document.getElementById("video");
  const canvas = document.getElementById("canvas");
  const ctx    = canvas.getContext("2d");
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.drawImage(video, 0, 0, window.innerWidth, window.innerHeight);
  requestAnimationFrame(canvasDraw);
}

function getVideoSources() {
  return new Promise((resolve, reject)=>{
    caminfos = [];
    if (!navigator.mediaDevices) {
      MediaStreamTrack.getSources((cams)=>{
        for(let i = 0; i <= cams.length; i++){
          if(i == cams.length ) resolve(caminfos);
          else if(cams[i].kind != 'videoinput') continue;
          else caminfos.push({name:cams[i].facing, id:cams[i].id});
        }
      });
    } else {
      navigator.mediaDevices.enumerateDevices().then((cams)=>{
        for(let i = 0; i <= cams.length; i++){
          if(i == cams.length ) resolve(caminfos);
          else if(cams[i].kind != 'videoinput') continue;
          else caminfos.push({name:cams[i].label, id:cams[i].deviceId});
        }
      });
    }
  });
  
}

{
  getVideoSources().then((cams)=>{
    let selectCameraIndex = 0;
    const camera = new Camera();
    camera.init(cams[selectCameraIndex].id);
    
    let timer = 0;
    window.onresize = ()=>{
      if(timer > 0) clearTimeout(timer);
      timer = setTimeout(()=>{
        camera.end(()=>{
          camera.init();
        })
      }, 200);
    };
  
    let chcycle = document.getElementById('chcycle');
    chcycle.onclick = ()=>{
      selectCameraIndex++;
      if(selectCameraIndex == cams.length){
        selectCameraIndex = 0;
      }
      camera.end(()=>{
        camera.init(cams[selectCameraIndex].id);
      })
    };
  });
}
