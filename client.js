// ye io client library se aata h (koi bhi browser server se connect hoga toh aa jayega)
const socket = io()
// console.log(io.version)
let name; 
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')
do {
    name = prompt('Please enter your name: ')
} while(!name)


textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter'){
        sendMessage(e.target.value)
    }
})

function sendMessage(message) {
    let msg = {
        user: name,
        message: message
    }

    // append the message to the message_area
    appendMessage(msg, 'outgoing')
    textarea.value = ''
    scrollToBottom()

    // sending to the server via websocket connection(socket variable client lib se mila) 
    // first argument : any name to be given
    // second argument : object 
    socket.emit('message', msg)
}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div')
    let className = type
    // ek div bana and usko class de message
    mainDiv.classList.add(className, 'message') // you can give multiple classes by adding a comma
    
    // div k andar kya hoga
    let markup = `
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
    `
    // andar ka items saara uss div mein daal
    mainDiv.innerHTML = markup

    // abey ye div kiske andar hona chahiye
    messageArea.appendChild(mainDiv)
}

// receive the message
// jo emit ka naam do usko hi on mein bhi do
// ye browser pe run hoga server pe nhi -> cmd pe nhi dikhega wewbsite k console mein dikhega
socket.on('message', (msg) => {
    appendMessage(msg, 'incoming')
    scrollToBottom()
})

// Auto scroll to bottom when the kast message is being sent
function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}