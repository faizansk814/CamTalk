let videoelement=document.getElementById("videoDiv");


let socket=io("https://video-application.onrender.com");
const hideaudio=document.getElementById("hide-audio")
const hidevideo=document.getElementById("hide-video")
const video = document.createElement('video');
video.muted = true;
const myPeer = new Peer();
let userConnected={}
let userStream;
const urlParams = new URLSearchParams(window.location.search);
const roomID = urlParams.get('roomID');
navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,

}).then(stream => {

    // Appending the user video to video element
    addStream(video,stream);
    userStream = stream;
 

    myPeer.on('call',(call)=>{
        call.answer(stream)

        const video=document.createElement('video')
        call.on('stream',(userStream)=>{
            console.log(userStream)
            addStream(video,userStream)
        })
    })

    // user joined the room
    socket.on("user-join", (userID) => {
        connectedNewUser(userID,stream)
    })

}).catch(err => {
    console.log(err);
})

socket.on('user-disconnected', (userID) => {
    if (userConnected[userID]) {
        userConnected[userID].close()
    }
})

myPeer.on('open',(id)=>{
    console.log("emited")
    socket.emit('join-room',roomID,id)
})

const connectedNewUser=(userID,stream)=>{
    const call=myPeer.call(userID,stream)

    const video=document.createElement('video')
    call.on('stream',(userStream)=>{
        console.log(userStream)
        addStream(video,userStream)
    })
    call.on('close',()=>{
        video.remove()
    })
    userConnected[userID]=call
    //videoelement.append(video)
}

const addStream = (video,stream) => {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
        video.play()
    })

    videoelement.append(video)
    console.log("video appended")

}


hidevideo.addEventListener('click',()=>{
    const videotrack=userStream.getTracks().find(track => track.kind === 'video')
    if(videotrack.enabled){
        videotrack.enabled=false
    }else{
        videotrack.enabled=true
    }
})

hideaudio.addEventListener('click',()=>{
    const audiotrack=userStream.getTracks().find(track => track.kind === 'audio')
    if(audiotrack.enabled){
        audiotrack.enabled=false
    }else{
        audiotrack.enabled=true
    }
})