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
            callback(err, null);
        }
    }
}
function main() {
}
main();
//# sourceMappingURL=chat_history.js.map