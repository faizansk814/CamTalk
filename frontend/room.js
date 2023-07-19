const createroom=document.getElementById("create")

const joinroom=document.getElementById("join")

async function CreateRoom(){
    const room = Math.floor(Math.random() * 900) + 100
    let obj={
        roomID:room,
        type:"video"
    }
    fetch("https://video-application.onrender.com/room/create",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(obj)
    })
    .then((res)=>{
        return res.json()
    })
    .then((data)=>{
        window.location.href=`./video.html?roomID=${room}`
    })
    .catch((err)=>{
        console.log(err)
    })
}
createroom.addEventListener('click', CreateRoom)

async function JoinRoom(){
    Swal.fire({
        title: 'Enter Your Room Number',
        input: 'text',
        inputAttributes: {
          autocapitalize: 'off',
          placeholder: 'XXX',
          required: true,
          id: 'roomID',
          typeof: 'number'
        },
        showCancelButton: true,
        confirmButtonText: 'Join',
        showLoaderOnConfirm: true,
        preConfirm: () => {
          return new Promise((resolve) => {
           
            // Validate or process user input here
            resolve();
          });
        },
        allowOutsideClick: () => !Swal.isLoading()
      });
      
    document.getElementsByClassName('swal2-confirm swal2-styled')[0].addEventListener("click", SwalFire)
}

async function SwalFire(){
    const roomID = document.getElementById('roomID').value;
        try {
            const request = await fetch(`https://video-application.onrender.com/room/join`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ roomID: roomID, type: "video" })
            });
            const response = await request.json();
            if (response.ok) {
               

                    window.location.href = `./video.html?roomID=${roomID}`;
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${response.msg}`,
                })
            }

        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.message,
            })
        }
}

joinroom.addEventListener("click",JoinRoom)