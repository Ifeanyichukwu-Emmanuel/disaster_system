const login_form = document.getElementById('login_form');
login_form.addEventListener('submit', (e) => {
    e.preventDefault();
 

    const email = login_form.email.value;
    const password = login_form.password.value;

    const emailErr = document.querySelector('.emailErr');  
    const passwordErr = document.querySelector('.passwordErr')

    const msg = document.querySelector('.msg')

    emailErr.innerHTML = '';
    passwordErr.innerHTML = '';


    const emailPattern = /^[a-z0-9]([a-z0-9_\.\-])*\@(([a-z0-9])+(\-[a-z0-9]+)*\.)+([a-z0-9]{2,4})/;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;



    if (!emailPattern.test(email)) {
        emailErr.innerHTML = 'Enter a valid email'
        throw Error('Terminating')
    }
    if (!passwordPattern.test(password)) {
        passwordErr.innerHTML = 'Enter a valid password'
        throw Error('Terminating')
    }
    let data = { email, password };


    fetch('/auth/login', {
        method: 'Post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then((data) => {
        if (data.success) {
            msg.innerHTML = data.message;
            msg.style.backgroundColor = '#d1e7dd';
            msg.style.padding = '10px'
            msg.style.marginBottom = '10px';
            msg.style.textAlign = 'center';
 
            setInterval(() => {
                window.location.href = '/admin/dashboard'
             }, 2000);

        }
        if (data.error) { 
            msg.innerHTML = data.error;
            msg.style.backgroundColor = 'red';
            msg.style.padding = '10px'
            msg.style.marginBottom = '4px';
            msg.style.textAlign = 'center'

            setInterval(() => {
               window.location.href = '/admin/login';
            }, 2000);
        }
    })
    .catch((e) => {
    })
})

const eyeIcons = document.querySelectorAll(".show-hide");
//  console.log(eyeIcons);

eyeIcons.forEach(eyeIcon => {
    eyeIcon.addEventListener("click", () => {
        const pInput = eyeIcon.parentElement.querySelector("input"); //getting parent element of eye icon and and selecting the password
        if (pInput.type === "password") {
            eyeIcon.classList.replace("bx-hide", "bx-show");
            return (pInput.type = "text");
        }
        eyeIcon.classList.replace("bx-show", "bx-hide");
        pInput.type = "password";
    });
});

