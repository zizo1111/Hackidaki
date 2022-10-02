function isDOMLoaded() {
    return document.readyState == 'complete';
}

const search = async (text, element) => {
    console.log('search', text)
    fetch('http://127.0.0.1:5000/api', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            sentence: text
        })
    })
        .then(res => res.json())
        .then(data => {
            // console.log(data);
            if (parseFloat(data["value"]) > 0.5) {
                element.classList.add("highlighted")
                element.classList.add("arrowpopup")
                console.log("hate content")
                alert("Please consider removing the hate content from your text")
            }
        })
        .catch(error => {
            console.log(error)
        })
};

const isTextareaOrInput = (element) => {
    if (!element) {
        return false;
    }
    const tagName = element.tagName.toUpperCase();

    if (tagName === "TEXTAREA" || tagName === "INPUT") {
        return true;
    }

    const isContentEditable = element.getAttribute('contenteditable');
    if (isContentEditable) {
        return true;
    }
    return false;
};

const listenActiveElement = (callback) => {
    let lastActiveElement = document.activeElement;
    if (isTextareaOrInput(lastActiveElement)) {
        callback(lastActiveElement);
    }

    const detectFocus = () => {
        if (lastActiveElement !== document.activeElement) {
            lastActiveElement = document.activeElement;
            if (isTextareaOrInput(lastActiveElement)) {
                callback(lastActiveElement);
            }
        }
    };
    window.addEventListener("focus", detectFocus, true);
};

const listenToTyping = (element) => {
    let timer; // Timer identifier
    let activeTypingTimer; // Timer identifier
    const waitTime = 3000; // Wait time in milliseconds
    let lastInput = element.value
    let activelyTyping = false
    let lastTypeTime = new Date().getTime();

    element.addEventListener("keydown", (e) => {
        activelyTyping = true;
        lastTypeTime = new Date().getTime();
    })

    element.addEventListener("keyup", (e) => {
        const target = e.target;

        let text = target.value;

        if (text === undefined) {
            text = target.innerText;
        }

        if (timer) {
            clearTimeout(timer);
        }

        if (activeTypingTimer) {
            clearTimeout(activeTypingTimer);
        }

        const activeTypingCheckTime = waitTime - 1000;

        activeTypingTimer = setTimeout(() => {
            if (activelyTyping) {
                const now = new Date().getTime();
                if (now > lastTypeTime + activeTypingCheckTime) {
                    activelyTyping = false;
                }
            }
        }, activeTypingCheckTime)

        timer = setTimeout(() => {
            if (text !== lastInput) {
                if (!activelyTyping) {
                    element.classList.remove("highlighted")
                    element.classList.remove("tooltipright")
                    const tooltip = document.getElementById('tooltipdemo');
                    if (tooltip) {
                        tooltip.parentNode.removeChild(tooltip)
                    }
                    search(text, element);
                    lastInput = text;
                }
            }
        }, waitTime);
    });
};

listenActiveElement((element) => {
    listenToTyping(element);
});


function doMagic() {
    const text = document.querySelectorAll('span, div, a')

    for (let i = 0; i < text.length; i++) {
        html_content = text[i].innerHTML
        const parsedInt = parseInt(html_content, 10);
        if (html_content.includes("<")) {
            continue
        } else if (html_content.trim().length < 3) {
            continue
        } else if (!isNaN(parsedInt)) {
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
                // console.log(data);
                if (parseFloat(data["value"]) > 0.5) {
                    const button = document.createElement('button')
                    button.classList.add("button")
                    button.addEventListener("click", () => alert("this might contain hate speech!"))
                    button.innerText = "WARNING This might be a hate content"
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
};

function doImgMagic() {

    if (isDOMLoaded()) {


        // check if reloaded
        // console.info(performance.getEntriesByType("navigation")[0].type);
        if (performance.getEntriesByType("navigation")[0].type == "reload") {
            console.info("This page is reloaded");
        } else {
            console.info("This page is not reloaded");
        }
        console.log("After timeout Img!");

        const el1 = document.querySelectorAll('div[aria-label="Image"]');
        for (let i = 0; i < el1.length; i++) {
            // console.info(el1[i]);
            const el1_c = el1[i].querySelector('div');

            const el1_img = el1[i].querySelector('img');
            // console.log(el1_img.getAttribute('src'));
            html_content = el1_img.getAttribute('src');
            // console.log("Running " + i);
            $.ajax('http://127.0.0.1:5000/api', {
                data: '{ "sentence": "' + html_content + '"}',
                type: "POST",
                success: function (data) {
                    if (parseFloat(data["value"]) > 0.5) {
                        el1_img.setAttribute('src', 'https://lh3.googleusercontent.com/pw/AL9nZEXbKFIs2AAuALvVWhlAoFUUDZ7kvfRBHOcM4CmM6FjgWxjFCUyytThDpny1XLNzLQjumpXJLEgSLTUMBwrbZnMljdKCfyKrEyNE_4OadWVS722vunNZ6JTcUtZAo07bhKPYsZdWkrvv3EbPDrNJYg=s500-no?authuser=0');
                        var content = el1_img.innerHTML;
                        el1_img.innerHTML = content;
                        el1_c.style.backgroundImage = "url('https://lh3.googleusercontent.com/pw/AL9nZEXbKFIs2AAuALvVWhlAoFUUDZ7kvfRBHOcM4CmM6FjgWxjFCUyytThDpny1XLNzLQjumpXJLEgSLTUMBwrbZnMljdKCfyKrEyNE_4OadWVS722vunNZ6JTcUtZAo07bhKPYsZdWkrvv3EbPDrNJYg=s500-no?authuser=0')";
                        // console.info(el1_img);
                    }
                },
            });

            // console.info(el1_img);
            // console.info(el1_c);
        }
    }
};
setTimeout(doMagic, 5000);
setTimeout(doImgMagic, 5000);
