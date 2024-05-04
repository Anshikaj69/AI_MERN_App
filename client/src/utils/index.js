import { surpriseMePrompts} from '../constants'
import FileSaver from 'file-saver'

export function getRandomPrompt(prompt){
    const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length)
    const randomPrompt = surpriseMePrompts[randomIndex]

    if(randomPrompt === prompt) return getRandomPrompt(prompt) // to make sure we dont get same prompts multiple times in a row 

    return randomPrompt
}

export async function downloadImage(_id, url) {
    try {
        console.log(url)
        const sliced = url.slice(4);
        const newUrl= 'https'+sliced
        console.log(newUrl)
        const response = await fetch(newUrl);
        const blob = await response.blob();
        const filename = `download-${_id}.jpg`;
        if (window.navigator.msSaveOrOpenBlob) {
            // For IE/Edge browsers
            window.navigator.msSaveOrOpenBlob(blob, filename);
        } else {
            // For other browsers
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        }
    } catch (error) {
        console.error('Error downloading image:', error);
    }
}