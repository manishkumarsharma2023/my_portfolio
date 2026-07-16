const nameText = "Hey, It's Me Manish";

const jobText = "Web Developer 💻";



let i = 0;

let j = 0;



function typeName() {

    if (i < nameText.length) {

        document.getElementById("typing-name").innerHTML += nameText.charAt(i);

        i++;

        setTimeout(typeName, 100);

    } else {

        setTimeout(typeJob, 500);

    }

}



function typeJob() {

    if (j < jobText.length) {

        document.getElementById("typing-job").innerHTML += jobText.charAt(j);

        j++;

        setTimeout(typeJob, 100);

    }

}



window.onload = typeName;


const form = document.getElementById("contactForm");

if (form) {
    form.addEventListener("submit", async function (e) {

        e.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

        const response = await fetch("http://localhost:3000/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                message
            })
        });

        const data = await response.json();

        alert(data.message);

        form.reset();
    });
}