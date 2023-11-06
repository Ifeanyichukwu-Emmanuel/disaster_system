
const updateForm = document.getElementById('updateForm');
updateForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const orgName = updateForm.orgName.value;
    const email = updateForm.email.value;
    const phone = updateForm.phone.value;
    const regNo = updateForm.regNo.value;
    const cac = updateForm.cac.value;

    const admin_id = updateForm.admin_id.value;

    const orgNameErr = document.querySelector('.orgNameErr');
    const alaert = document.querySelector('.alaert')

    orgNameErr.innerHTML = '';
   

    const namePattern = /^[a-zA-Z\s]+$/;
    const emailPattern = /^[a-z0-9]([a-z0-9_\.\-])*\@(([a-z0-9])+(\-[a-z0-9]+)*\.)+([a-z0-9]{2,4})/;
    const phone_noPattern = /^[0-9]+$/;
    const regNo_Reg =  /^[a-zA-Z0-9\s/-]+$/;
    const cacRegex = /^[a-zA-Z0-9\s,-/]+$/;
   

    if (!namePattern.test(orgName)) {
        orgNameErr.innerHTML = 'Invalid Name Format';
        throw Error('Terminating')
    }
    if (!emailPattern.test(email)) {
        orgNameErr.innerHTML = 'Enter a valid email';
        throw Error('Terminating')
    }
    if (!phone_noPattern.test(phone)) {
        orgNameErr.innerHTML = 'Enter a valid Phone Number';
        throw Error('Terminating') 
    }
    if (!regNo_Reg.test(regNo)) {
        orgNameErr.innerHTML = 'Enter a valid Reg number';
        throw Error('Terminating')
    }
    if (!cacRegex.test(cac)) {
        orgNameErr.innerHTML = 'Enter a valid CAC number';
        throw Error('Terminating')
    }

    const data = { orgName, email, admin_id, phone, regNo, cac };

    fetch('/admin/update-profile', {   
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }) 
    .then(res => res.json())
    .then((data) => {
        if (data.success) {
            alaert.innerHTML = data.message;
            alaert.style.backgroundColor = '#d1e7dd';
            alaert.style.padding = '10px'
            alaert.style.marginBottom = '4px';
            alaert.style.textAlign = 'center'
   
            setInterval(() => {
               window.location.href = '/admin/profile' 
            }, 2000);
        }
   
        if (data.error) {
            alaert.innerHTML = data.error;
            alaert.style.backgroundColor = 'red';
            alaert.style.padding = '10px'
            alaert.style.marginBottom = '4px';
            alaert.style.textAlign = 'center'
    
            setInterval(() => {
                window.location.href = '/admin/profile'
            }, 2000);
        }
   
    })
    .catch((e)); 
    console.log(e);
})