let videoelement=document.getElementById("videoappend");


let socket=io("http://localhost:4031");
const video = document.createElement('video');
video.muted = true;
const myPeer = new Peer();
let userConnected={}

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
const roomid=123
myPeer.on('open',(id)=>{
    console.log("emited")
    socket.emit('join-room',roomid,id)
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