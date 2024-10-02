"use client";

import useSockets from "@/hooks/useSockets";

const EmojiCatchContainer = () => {
    const { message, setMessage, messages, sendMessage } = useSockets()

    return (
        <div>
            <h1>Catch Mind Game</h1>
            <ul>
                {messages.map((msg, index) => (
                    <li key={index}>{msg}</li>
                ))}
            </ul>
            <form onSubmit={sendMessage}>
                <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    autoComplete="off"
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
}

export default EmojiCatchContainer