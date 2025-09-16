// Opening a popup for subscription, otherwise opening a new window/tab
function openCenteredPopup(url, title, w, h) {
const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;

const width = window.innerWidth || document.documentElement.clientWidth || screen.width;
const height = window.innerHeight || document.documentElement.clientHeight || screen.height;

const left = ((width / 2) - (w / 2)) + dualScreenLeft;
const top = ((height / 2) - (h / 2)) + dualScreenTop;

return window.open(url, title, `scrollbars=yes, width=${w}, height=${h}, top=${top}, left=${left}`);
}

document.getElementById('custom-subscribe-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    if (!email) return;

    const subscribeUrl = `https://hybroht.substack.com/subscribe?email=${encodeURIComponent(email)}`;

    // Try to open popup
    const popup = openCenteredPopup(subscribeUrl, 'Subscribe to Newsletter', 500, 600);

    // Detect if popup was blocked
    if (!popup || popup.closed || typeof popup.closed === 'undefined') {
    // Popup blocked, fallback to opening in a new tab/window
    window.open(subscribeUrl, '_blank');
    } else {
    // Popup opened successfully, focus it
    popup.focus();
    }
});
