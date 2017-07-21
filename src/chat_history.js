/* properties */
let CN = "ChatHistory";
/* methods */
function get(url, callback) {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = requestHandler;
    xmlHttp.open('GET', url);
    xmlHttp.send();
    function requestHandler() {
        try {
            if (xmlHttp.readyState !== 4)
                return;
            if (xmlHttp.status !== 200)
                throw new Error(xmlHttp.statusText || 'HTTP STATUS ' + xmlHttp.status);
            callback(null, xmlHttp.responseText);
        }
        catch (err) {
            console.error(err);
            callback(err, null);
        }
    }
}
function displayHistory(data) {
    if (!data) {
        console.error('missing data - aborting');
        return;
    }
    let targetElement = document.querySelector('[data-chat-history]');
    let htmlStyle = targetElement.getAttribute('data-chat-history');
    let bubbleClass;
    let html = '';
    let div = document.createElement('div');
    div.className = 'chat-history';
    _.each(data.conversation, (statements, index) => {
        bubbleClass = index % 2 === 0 ? 'person-left' : 'person-right';
        html += `<div class="statements">`;
        _.each(statements, (statement) => {
            html += `<div class="bubble ${bubbleClass}">${statement}</div>`;
        });
        html += `</div>`;
    });
    div.innerHTML = html;
    if (htmlStyle === 'outer') {
        targetElement.outerHTML = div.outerHTML;
    }
    else {
        targetElement.appendChild(div);
    }
}
function main() {
    get('history.json', (error, jsonStr) => {
        try {
            displayHistory(JSON.parse(jsonStr));
        }
        catch (err) {
            console.error(err);
        }
    });
}
/* entry point */
main();
//# sourceMappingURL=chat_history.js.map