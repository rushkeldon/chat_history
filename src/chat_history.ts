function get(url: string, callback: any) {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = requestHandler;
    xmlHttp.open('GET', url);
    xmlHttp.send();

    function requestHandler() {
        try {
            if (xmlHttp.readyState !== 4) return;
            if (xmlHttp.status !== 200)
                throw new Error(
                    xmlHttp.statusText || 'HTTP STATUS ' + xmlHttp.status
                );
            callback(null, xmlHttp.responseText);
        } catch (err) {
            callback(err, null);
        }
    }
}

function main(){

}

main();
