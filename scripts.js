// service worker
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("service-worker.js", {
                scope: "/PWA-Lab04/"
            })
            .then(registration => {
                console.log("Service Worker registered: ", registration)
            })
            .catch(registrationError => {
                console.log("Service Worker registration failed: ", registrationError)
            })
    })
}

// disabling the form section initally
document.getElementById("form-section").style.display = "none"

// on send notification button clicked
if ("Notification" in window && "serviceWorker" in navigator) {
    document.getElementById("send-notification-button").addEventListener("click", function () {
        var permissionStatus = Notification.permission;
        console.log("Notification permission status: ", permissionStatus)
        if (permissionStatus === "granted") {
            showFormSec();
        } else {
            Notification.requestPermission(function (status) {
                console.log('Notification permission status:', status);
                if (status === "granted") {
                    showFormSec();
                }
            });
        }
    });

    // when show button clicked: new notification is created
    document.getElementById("show-button").addEventListener("click", function () {
        if (document.getElementById("title").value === "") {
            document.getElementById("error").innerHTML = "Please add content in Title";
        } else {
            console.log("Else section")
            var options = {
                body: document.getElementById('body').value,
                actions: [{
                        action: "agree",
                        title: "Agree"
                    },
                    {
                        action: "disagree",
                        title: "Disagree"
                    },
                ],
            };
            new Notification(document.getElementById("title").value)
            //new Notification(document.getElementById("body").value)
             //navigator.serviceWorker.ready.then((register) => {
               //  register.showNotification(title.value, options);
             //});
        }
    });

    navigator.serviceWorker.addEventListener("message", function (event) {
        document.getElementById("error").innerHTML = event.data;
    });
}

function showFormSec() {
    document.getElementById("form-section").style.display = "block";
    document.getElementById("send-notification-button").style.display = "none";
}