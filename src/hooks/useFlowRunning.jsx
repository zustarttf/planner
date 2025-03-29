import React, { useEffect } from 'react';

const RunningEmoji = () => {
    useEffect(() => {
        const emojiElement = document.getElementById('running-emoji');
        if (emojiElement) {
            const emojis = ['🏃‍♂️', '🚶‍♂️'];
            let currentIndex = 0;

            const interval = setInterval(() => {
                currentIndex = (currentIndex + 1) % emojis.length;
                emojiElement.innerText = emojis[currentIndex];
            }, 500);

            return () => clearInterval(interval); // 컴포넌트가 unmount될 때 정리
        }
    }, []);

    return <span id="running-emoji"></span>;
};

export default RunningEmoji;