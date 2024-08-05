import { useState } from 'react';
function Popup(){
    const [cameraToggle , setCameraToggle] = useState(false);
    const [audioToggle , setAudioToggle] = useState(false);
    const [recordView , setRecordView] = useState("Current Tab");

    let mediaRecorder;
  
    async function recordScreen() {
      return await navigator.mediaDevices.getDisplayMedia({
          audio: true, 
          video: {}
      });
  }
  
    function saveFile(recordedChunks){
  
     const blob = new Blob(recordedChunks, {
        type: 'video/webm'
      });
      let filename = window.prompt('Enter file name'),
          downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = `${filename}.webm`;
  
      document.body.appendChild(downloadLink);
      downloadLink.click();
      URL.revokeObjectURL(blob); // clear from memory
      document.body.removeChild(downloadLink);
    }
    
    function createRecorder (stream, mimeType) {
    // the stream data is stored in this array
    let recordedChunks = []; 
  
    const mediaRecorder = new MediaRecorder(stream);
  
    mediaRecorder.ondataavailable = function (e) {
      if (e.data.size > 0) {
        recordedChunks.push(e.data);
      }  
    };
    mediaRecorder.onstop = function () {
       saveFile(recordedChunks);
       recordedChunks = [];
    };
    mediaRecorder.start(200); // For every 200ms the stream data will be stored in a separate chunk.
        return mediaRecorder;
    }
}

export default Popup;