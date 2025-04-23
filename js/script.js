function sendEmail() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    const templateParams = {
        from_name: name,
        from_email: email,
        subject: subject,
        message: message,
    };

    emailjs.send("service_wwctwgo", "template_9z1ml25", templateParams, "URlsj2ez8kxbqvpf9")
        .then((response) => {
            document.getElementById("formMessage").innerHTML = "Message sent successfully!";
            document.getElementById("formMessage").style.color = "green";
        })
        .catch((error) => {
            document.getElementById("formMessage").innerHTML = "Failed to send message. Please try again.";
            document.getElementById("formMessage").style.color = "red";
            console.error("EmailJS Error:", error);
        });
}

document.addEventListener("click", function () {
    const audio = document.getElementById("backgroundAudio");
    audio.muted = false;
});