const urlParams = new URLSearchParams(window.location.search);
let tokenurl = urlParams.get('token');
let username = urlParams.get("name")
let image = urlParams.get("image")
console.log(username)
MainServerStart()
VideoServerStart()
function MainServerStart(){
    fetch("https://video-application-main-serverrrr.onrender.com/start")
    .then((res)=>{
        return res.json()
    })
    .then((data)=>{
        console.log(data)
    })
    .catch((err)=>{
        console.log(err)
    })

}

function VideoServerStart(){
    fetch("https://video-application.onrender.com/video")
    .then((res)=>{
        return res.json()
    })
    .then((data)=>{
        console.log(data)
    })
    .catch((err)=>{
        console.log(err)
    })
}

if (tokenurl) {

    localStorage.setItem("token", tokenurl)
    localStorage.setItem("username", username)
    localStorage.setItem("image", image)
}

const googleouathtoken = localStorage.getItem("token") || ""
const localimage = localStorage.getItem("image") || ""
const localname = localStorage.getItem("username") || ""

const logout = document.getElementById("logout")
const displayName = document.getElementById("display-name")
const log = document.getElementById("log")


if (!googleouathtoken) {
    displayName.style.display = "none"
    log.style.display = "none"
} else {
    log.style.display = "none"
    if (localname != "") {
        const h2tag = document.createElement("h5")
        h2tag.innerText = localname
        displayName.append(h2tag)
    }
    if (localimage != "") {
        const imagetag = document.createElement("img")
        imagetag.src = localimage
        displayName.append(imagetag)
    }
    logout.innerText = "logout"
}

logout.addEventListener('click', () => {
    if (logout.innerText == "Signin/Signup") {
        window.location.href = "login.html"
    } else {
        localStorage.clear()
        window.location.href = "index.html"
    }
})
