//Does browser support service worker

if('serviceWorker' in navigator) {
    //then register our service worker
    navigator.serviceWorker.register('/sw.js')
    .then(reg => {
        //display a success message
        console.log('ServiceWorker Registration (Scope: ${reg.scope})');
    }).catch(
        error => {
            //display an error message
            console.log('Service Worker Error (${error})');
        });
}else{
    //happens when the app isn't served over a TLS connection (HTTPS)
    //or if the browser doesn't support the service worker
    console.log('Service Worker is not available')
}