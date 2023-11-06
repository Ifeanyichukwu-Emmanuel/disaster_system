//Hide and show password
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

const registrationForm = document.getElementById('registrationForm');
registrationForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const orgName = registrationForm.orgName.value;
    const email = registrationForm.email.value;
    const phone = registrationForm.phone.value;
    const regNo = registrationForm.regNo.value;
    const cac = registrationForm.cac.value;
    const password = registrationForm.password.value;

    const orgNameErr = document.querySelector('.orgNameErr');
    const emailErr = document.querySelector('.emailErr');
    const phoneErr = document.querySelector('.phoneErr');
    const regNoErr = document.querySelector('.regNoErr');
    const cacErr = document.querySelector('.cacErr');
    const passwordErr = document.querySelector('.passwordErr');

    const msg = document.querySelector('.msg')

    orgNameErr.innerHTML = '';
    emailErr.innerHTML = '';
    phoneErr.innerHTML = '';
    regNoErr.innerHTML = '';
    cacErr.innerHTML = '';
    passwordErr.innerHTML = '';

    const namePattern = /^[a-zA-Z\s]+$/;
    const emailPattern = /^[a-z0-9]([a-z0-9_\.\-])*\@(([a-z0-9])+(\-[a-z0-9]+)*\.)+([a-z0-9]{2,4})/;
    const phone_noPattern = /^[0-9]+$/;
    const regNo_Reg =  /^[a-zA-Z0-9\s/-]+$/;
    const cacRegex = /^[a-zA-Z0-9\s,-/]+$/;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

    if (!namePattern.test(orgName)) {
        orgNameErr.innerHTML = 'Invalid Name Format';
        throw Error('Terminating')
    }
    if (!emailPattern.test(email)) {
        emailErr.innerHTML = 'Enter a valid email';
        throw Error('Terminating')
    }
    if (!phone_noPattern.test(phone)) {
        phoneErr.innerHTML = 'Enter a valid Phone Number';
        throw Error('Terminating')
    }
    if (!regNo_Reg.test(regNo)) {
        regNoErr.innerHTML = 'Fill this form correctly';
        throw Error('Terminating')
    }
    if (!cacRegex.test(cac)) {
        cacErr.innerHTML = 'Fill this form correctly';
        throw Error('Terminating')
    }
    if (!passwordPattern.test(password)) {
        passwordErr.innerHTML = 'Enter a valid password';
        throw Error('Terminating')
    }

    const data = { orgName, email, phone, regNo, cac, password };

    fetch('/auth/register', {   
        method: 'POST',
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
            msg.style.marginBottom = '4px';
            msg.style.textAlign = 'center'
   
            setInterval(() => {
               window.location.href = '/admin/login' 
            }, 2000);
        }
   
        if (data.error) {
            msg.innerHTML = data.error;
            msg.style.backgroundColor = 'red';
            msg.style.padding = '10px'
            msg.style.marginBottom = '4px';
            msg.style.textAlign = 'center'
    
            setInterval(() => {
                window.location.href = '/admin/register'
            }, 2000);
        }
   
    })
    .catch((e)); 

})