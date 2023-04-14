import React, { useRef,useEffect, useState } from "react";

const Chat = ({ socket, username, roomkey }) => {
    const messageListRef = useRef(null);
    const [message, setMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

    const scrollToBottom = () => {
        messageListRef.current.addEventListener('DOMNodeInserted', event => {
            const { currentTarget: target } = event;
            target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
        });
    }
    
    useEffect(() => {
        socket.on("newMessage", (messageData) => {
            console.log("newMessage arrived:  :)))) >> " + messageData)
            setMessageList((prev) => [...prev, messageData]) //Insert recent arrivals to existing MessageList when newMessage is triggered.
            scrollToBottom();
        })
    }, [socket])

    const sendMessage = async () => {
        const messageData = {
            username: username,
            message: message,
            roomkey: roomkey,
            date: new Date(Date.now()).getHours() + " : " + new Date(Date.now()).getMinutes()
        }
        await socket.emit("message", messageData)
        setMessageList((prev)=> [...prev, messageData]) //Insert recent arrivals to existing MessageList when you send message.
        setMessage("")
        scrollToBottom();
    }
    //console.log("messageList for ",username," : ", messageList);
    
    return (
    
        <React.Fragment>

        <div class="custom-shape-divider-top-1679869192">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" class="shape-fill"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" class="shape-fill"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" class="shape-fill"></path>
        </svg>
        </div>
        <div className="box flex items-center justify-center h-full text-white	">
            <div className="card w-2/4 h-4/5 bg-indigo-300  relative space-y-4 p-5"> 
                    <div className="w-full h-[87%] overflow-y-auto scrollbar-hidden" ref={messageListRef}>
                        <p>Room: {roomkey}, you are @{username}</p><br />
                        {/*This is derived message example */}
                        <div className="flex justify-start">
                            <div className=" bg-[#3e4760] text-left px-3 py-2 rounded-[20px] rounded-tl-none text-sm overflow-y-auto mb-2">
                                <span className="text-[12px] opacity-50 mr-3">@username</span>
                                <span className="text-[12px] float-right opacity-50">05:29</span>
                                <p className="">Lorem ipsum dolor sit amet.</p>
                            </div>
                        </div>

                        {/*This is sent message example */}
                        <div className="flex justify-end">
                            <div className=" bg-[#ff7860] text-left px-3 py-2 rounded-[20px] rounded-br-none text-sm overflow-y-auto mb-2">
                            <span className="text-[12px] opacity-50 mr-3">@username</span>
                            <span className="text-[12px] float-right opacity-50">05:34</span>
                            <p className="">Lorem ipsum.</p>
                            </div>
                        </div>
                        {
                            messageList && messageList.map((msg, i) => (
                                <div className={`${msg.username === username ? 'flex justify-end':'flex justify-start'}`}>
                                <div className={`${msg.username === username ? 'bg-[#ff7860] text-left px-3 py-2 rounded-[20px] rounded-br-none text-sm overflow-y-auto mb-2':'bg-[#3e4760] text-left px-3 py-2 rounded-[20px] rounded-tl-none text-sm overflow-y-auto mb-2'}`}>
                                <span className="text-[12px] opacity-50 mr-3">@{msg.username}</span>
                                <span className="text-[12px] float-right opacity-50">{msg.date}</span>
                                <p className="">{msg.message}</p>
                                </div>
                            </div>

                            ))
                        }





                </div>
                    
                <div className="padding-30 absolute bottom-0 left-0 right-0 flex justify-between">
                    <input value={message} onChange={e => setMessage(e.target.value)}  className="h-12 bg-mainDark w-4/5" type="text" placeholder="Your message here.." />
                    <button onClick={sendMessage} className="bg-[#a5b5fb] text-white rounded-md w-20 hover:bg-[#ff927f]">SEND</button>    
               </div>
                
            </div>
            </div>


        
        </React.Fragment>
    )
}

export default Chat;