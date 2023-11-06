
const reportForm = document.getElementById('reportForm');
reportForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const fullName = reportForm.fullName.value;
    const email = reportForm.email.value;
    const phone = reportForm.phone.value;
    const address = reportForm.address.value;
    const state = reportForm.state.value;
    const localGovt = reportForm.localGovt.value;
    const disaster_typ = reportForm.disaster_typ.value;
    const description = reportForm.discription.value;
    const images = reportForm.images;

    const fNameErr = document.querySelector('.fNameErr');

    const msg = document.querySelector('.msg')

    fNameErr.innerHTML = '';

    const name_Reg = /^[a-zA-Z\s]+$/;
    const email_Reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneNo_Reg = /^[0-9]+$/;
    const address_Reg = /^[a-zA-Z0-9\s,.-/]+$/;
    const descPattern = /^[a-zA-Z\s\S-_+@]+$/;


    if (!name_Reg.test(fullName)) {
        fNameErr.innerHTML = 'Invalid Name Format';
        throw Error('Terminating')
    }
    if (!email_Reg.test(email)) {
        fNameErr.innerHTML = 'Enter a valid email';
        throw Error('Terminating')
    }
    if (!phoneNo_Reg.test(phone)) {
        fNameErr.innerHTML = 'Enter a valid Phone Number';
        throw Error('Terminating')
    }
    if (!address_Reg.test(address)) {
        fNameErr.innerHTML = 'Enter a valid address';
        throw Error('Terminating')
    }
    if (!descPattern.test(state)) {
        fNameErr.innerHTML = 'Incorrect state format';
        throw Error('Terminating')
    }
    if (!descPattern.test(localGovt)) {
        fNameErr.innerHTML = 'Enter a valid L.G.A';
        throw Error('Terminating')
    }
    if (!descPattern.test(disaster_typ)) {
        fNameErr.innerHTML = 'Enter The type of disaster';
        throw Error('Terminating')
    }
    if (!descPattern.test(description)) {
        fNameErr.innerHTML = 'Write the description of the disaster';
        throw Error('Terminating')
    }
    if (images == '') {
        fNameErr.innerHTML = 'Please Select Image';
        throw Error('Terminating')
    }
    const formData = new FormData();

    formData.append('fullName', fullName);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('address', address);
    formData.append('state', state);
    formData.append('localGovt', localGovt);
    formData.append('disaster_typ', disaster_typ);
    formData.append('description', description);
    if (images.files.lenght !== 0) {
        for (const file of images.files) {
            formData.append('images', file)
        }
    }
    fetch('/report-disaster', {
        method: 'POST',
        headers: {
            // 'Content-Type': 'application/json'
        },
        body: formData
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
                    window.location.href = '/'
                }, 4000);
            }

            if (data.error) {
                msg.innerHTML = data.error;
                msg.style.backgroundColor = 'red';
                msg.style.padding = '10px'
                msg.style.marginBottom = '4px';
                msg.style.textAlign = 'center'

                setInterval(() => {
                    window.location.href = '/'
                }, 5000);
            }

        })
        .catch((e));
})