import removeMarkup from 'src/utils/removeMarkup';

export default function mark(color: string, textColor: string, selectedText: string): string {
    return `<mark style="background-color:${color}; color:${textColor};">${removeMarkup(selectedText)}</mark>`;
}
