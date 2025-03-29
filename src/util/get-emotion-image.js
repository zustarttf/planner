import emotion0 from './../assets/new0per.svg';
import emotion1 from './../assets/new10per.svg';
import emotion2 from './../assets/new30per.svg';
import emotion3 from './../assets/new50per.svg';
import emotion4 from './../assets/new70per.svg';
import emotion5 from './../assets/new90per.svg';
import emotion6 from './../assets/new100per.svg';

export function getEmotionImage(emotionId) {
    switch (emotionId) {
        case 0: return emotion0;
        case 1: return emotion1;
        case 2: return emotion2;
        case 3: return emotion3;
        case 4: return emotion4;
        case 5: return emotion5;
        case 6: return emotion6;
        default: return null;
    }
}