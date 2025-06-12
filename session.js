function checkSession() {
    const loginTime = localStorage.getItem('loginTime');
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    // If on login.html, do not redirect, even if the session is valid
    if (currentPage === 'login.html') {
        return;
    }

    // Check if user is logged in and session is still valid (1 hour)
    if (isLoggedIn === 'true' && loginTime) {
        const currentTime = new Date().getTime();
        const loginTimestamp = parseInt(loginTime);
        const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds

        if (currentTime - loginTimestamp >= oneHour) {
            // Session expired, clear localStorage and redirect to login
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('loginTime');
            window.location.href = 'login.html';
        }
        // If session is valid, do nothing (stay on the current page)
    } else {
        // Not logged in or invalid session, redirect to login
        window.location.href = 'login.html';
    }
}

// Run session check on page load (except on login.html)
document.addEventListener('DOMContentLoaded', () => {
    checkSession();
});
