export default function removeMarkup(text: string): string {
    const HTMLRegex = /<[^>]*>/g;
    return text.replace(HTMLRegex, '');
}
