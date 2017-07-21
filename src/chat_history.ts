/* properties */
let CN : string = "ChatHistory";

/* methods */
function get( url : string, callback : any ) : void {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = requestHandler;
    xmlHttp.open( 'GET', url );
    xmlHttp.send();

    function requestHandler() {
        try {
            if( xmlHttp.readyState !== 4 ) return;
            if( xmlHttp.status !== 200 )
                throw new Error(
                    xmlHttp.statusText || 'HTTP STATUS ' + xmlHttp.status
                );
            callback( null, xmlHttp.responseText );
        } catch( err ) {
            console.error( err );
            callback( err, null );
        }
    }
}

function displayHistory( data : ChatHistoryData ) {
    if( !data ){
        console.error( 'missing data - aborting' );
        return;
    }
    let targetElement : HTMLElement = document.querySelector( '[data-chat-history]' ) as HTMLElement;
    let htmlStyle : string = targetElement.getAttribute( 'data-chat-history' );
    let bubbleClass : string;
    let html : string = '';
    let div : HTMLDivElement = document.createElement( 'div' ) as HTMLDivElement;
    div.className = 'chat-history';

    _.each( data.conversation, ( statements : string[], index : number ) => {
        bubbleClass = index%2 === 0 ? 'person-left' : 'person-right';
        html += `<div class="statements">`
        _.each( statements, ( statement ) => {
            html += `<div class="bubble ${bubbleClass}">${statement}</div>`;
        } );
        html += `</div>`;
    } );

    div.innerHTML = html;

    if( htmlStyle === 'outer' ){
        targetElement.outerHTML = div.outerHTML;
    } else {
        targetElement.appendChild( div );
    }
}

function main() {
    get( 'history.json', ( error, jsonStr ) => {
        try{
            displayHistory( JSON.parse( jsonStr ) as ChatHistoryData );
        } catch( err ){
            console.error( err );
        }
    } );
}

/* entry point */
main();

/* interfaces */
interface ChatHistoryData {
    people : string[],
    conversation : [ string[] ]
}
