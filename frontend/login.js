const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});

const nameinp = document.getElementById("name")
const emailinp = document.getElementById("email")
const passwordinp = document.getElementById("password")
const signupbutton = document.getElementById("signupbtn")

function Signup() {
    let obj = {
        name: nameinp.value,
        email: emailinp.value,
        password: passwordinp.value
    }
    const option = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
    }
    fetch("http://localhost:8080/user/register", option)
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            if (data.msg == "Registration Succesfull") {
                Swal.fire({
                    title: data.msg,
                    text: 'You have Registered Succesfully',
                    icon: 'success'
                })
                container.classList.remove("right-panel-active");
            } else {
                Swal.fire({
                    title: data.msg,
                    text: data.msg,
                    icon: 'error'
                })
            }
        })
        .catch((err) => {
            console.log(err)
        })
}

signupbutton.addEventListener("click", Signup)

const loginemailinp = document.getElementById("loginemail")
const loginpasswordinp = document.getElementById("loginpass")
const signinbutton = document.getElementById("siginbtn")

function Login() {
    let obj = {
        email: loginemailinp.value,
        password: loginpasswordinp.value
    }
    const option = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
    }
    fetch("http://localhost:8080/user/login", option)
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            if (data.msg == "login success") {
                Swal.fire({
                    title: data.msg,
                    text: 'You have Login Succesfully',
                    icon: 'success'
                })
                localStorage.setItem("token",data.token)
                window.location.href="index.html"
            } else {
                Swal.fire({
                    title: data.msg,
                    text: data.msg,
                    icon: 'error'
                })
            }
        })
        .catch((err) => {
            console.log(err)
        })
}

signinbutton.addEventListener('click',Login)