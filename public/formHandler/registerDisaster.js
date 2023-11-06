const registerDisasterForm = document.getElementById('registerDisasterForm');
registerDisasterForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // get form inputs
    const disaster = registerDisasterForm.disaster.value;
 

    const disasterErr = document.querySelector('.disasterErr')
    

    const msg = document.querySelector('.msg')

    disasterErr.innerHTML = '';
   

    //    ==========Data cleaning====== 
    const disaster_Reg = /^[a-zA-Z0-9\s(),-./]+$/;

   
    if (!disaster_Reg.test(disaster)) {
        disasterErr.innerHTML = 'Enter disaster name'
        throw new Error('Terminate');
    }
  


    // ********** Post form data to backend **********
    const data = { disaster };

    fetch('/admin/registered-disaster', {
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
                    window.location.href = '/admin/registered-disaster'
                }, 6000);
            }

            if (data.error) {
                msg.innerHTML = data.error;
                msg.style.backgroundColor = 'red';
                msg.style.padding = '10px'
                msg.style.marginBottom = '4px';
                msg.style.textAlign = 'center'

                setInterval(() => {
                    window.location.href = '/registered-disaster'
                }, 2000);
            }

        })
        .catch((e));
})
