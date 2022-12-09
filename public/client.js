const socket = io()
let name; let date;

function date1(){
let m=new Date().getMinutes();
let h=new Date().getHours();
date=`${h}:${m}`;
return date;}

let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')
let h1=document.querySelector('#name1');
do {
    name = prompt('Please enter your name: ')
    h1.textContent=name;
  
} while(!name)


textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        sendMessage(e.target.value)
    }
})

function sendMessage(message) {
    let msg = {
        Time: date1(),
        message: message.trim()
    }
    // Append 
    appendMessage(msg, 'outgoing')
    textarea.value = ''
    scrollToBottom()

    // Send to server 
    socket.emit('message', msg)

}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')


    let markup = `
       
        <p>${msg.message}</p>
        <h4>${msg.Time}</h4>
    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}

// Recieve messages 
socket.on('message', (msg) => {
    appendMessage(msg, 'incoming')
     scrollToBottom()
})

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}



