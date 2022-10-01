function doMagic() {
    console.log("After timeout!");
    const text = document.querySelectorAll('span, div, a')

    for (let i = 0; i < text.length; i++) {
        html_content = text[i].innerHTML
        const parsedInt = parseInt(html_content, 10);
        if (html_content.includes("<")) {
            console.log("Skip")
            continue
        } else if (html_content.trim().length < 3) {
            console.log("Skip")
            continue
        } else if (!isNaN(parsedInt)) {
            console.log("Skip")
            continue
        }

        fetch('http://127.0.0.1:5000/api', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                sentence: html_content
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (parseFloat(data["value"]) > 0.5) {
                    const button = document.createElement('button')
                    button.classList.add("button")
                    button.addEventListener("click", () => alert("this might contain hate speech!"))
                    button.innerText = "WARNING 18+"
                    text[i].before(button)
                    const newElement = document.createElement('span')
                    newElement.innerHTML = text[i].textContent.replace(/([\s\S]*)/gi, '<span class="spoiler">$1</span>')
                    text[i].replaceWith(newElement)
                }
            })
            .catch(error => {
                console.log(error)
            })
    }
}

// console.log("In extension!");
setTimeout(doMagic, 10000);
