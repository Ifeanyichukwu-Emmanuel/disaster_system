
const msg = document.querySelector('.msg')
function deleteDisaster(disaster_id) {

    // console.log(disaster_id);
    if (disaster_id === '') {
        msg.innerHTML = data.error;
        msg.style.backgroundColor = 'red';
        msg.style.padding = '10px'
        msg.style.marginBottom = '4px';
        msg.style.textAlign = 'center'

        setInterval(() => {
            window.location.href = '/admin/registered-disaster'
        }, 3000);
    }
    const data = { disaster_id }
    fetch('/admin/delete-disaster', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ disaster_id })
    })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                msg.innerHTML = data.message;
                msg.style.backgroundColor = '#d1e7dd';
                msg.style.padding = '10px'
                msg.style.marginBottom = '4px';
                msg.style.textAlign = 'center'

                setInterval(() => {
                    window.location.href = '/admin/registered-disaster'
                }, 2000);
            }

            if (data.error) {
                msg.innerHTML = data.error;
                msg.style.backgroundColor = 'red';
                msg.style.padding = '10px'
                msg.style.marginBottom = '4px';
                msg.style.textAlign = 'center'

                setInterval(() => {
                    window.location.href = '/admin/registered-disaster'
                }, 3000);
            }
        })
        .catch(e => {
        })
}

