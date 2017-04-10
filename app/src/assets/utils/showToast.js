function showToast(message) {
    const ctn = document.querySelector('.container');
    let toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = message;
    ctn.appendChild(toast);
    setTimeout(function () {
        toast.style.opacity = '.6';
        toast.style.top = '40px';
    },100);
    setTimeout(function () {
        toast.style.opacity = '0';
        toast.style.top = '0';
    },1400);
    setTimeout(function () {
        ctn.removeChild(toast);
    },2400);
}

export default showToast