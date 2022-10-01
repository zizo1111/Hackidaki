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




        console.log("Running " + i);
        $.ajax('http://127.0.0.1:5000/api', {
            data: '{ "sentence": "' + html_content + '"}',
            type: "POST",
            success: function(data) {
                console.log(data);
                if (parseFloat(data["value"]) > 0.5)
                    text[i].innerHTML = "WARNING 18+: " + text[i].innerHTML
            }
        });
    }
}

console.log("In extension!");
setTimeout(doMagic, 10000);