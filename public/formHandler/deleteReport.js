
const msg = document.querySelector('.msg')
function deleteReport(report_id) {

    // console.log(report_id);
    if (report_id === '') {
        msg.innerHTML = data.error;
        msg.style.backgroundColor = 'red';
        msg.style.padding = '10px'
        msg.style.marginBottom = '4px';
        msg.style.textAlign = 'center'

        setInterval(() => {
            window.location.href = '/admin/report'
        }, 3000);
    }
    const data = { report_id }
    fetch('/admin/delete-report', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ report_id })
    })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                msg.innerHTML = data.msg;
                msg.style.backgroundColor = '#d1e7dd';
                msg.style.padding = '10px'
                msg.style.marginBottom = '4px';
                msg.style.textAlign = 'center'

                setInterval(() => {
                    window.location.href = '/admin/report'
                }, 2000);
            }

            if (data.error) {
                msg.innerHTML = data.error;
                msg.style.backgroundColor = 'red';
                msg.style.padding = '10px'
                msg.style.marginBottom = '4px';
                msg.style.textAlign = 'center'

                setInterval(() => {
                    window.location.href = '/admin/report'
                }, 3000);
            }
        })
        .catch(e => {
        })
}

