import { HTMLElementData } from 'src/types';

export default function render(data: HTMLElementData, contentEl: HTMLElement): HTMLElement {
    const { Element, id, text, attr, class: className, style } = data;
    const element = contentEl.createEl(Element, {
        text,
        attr: {
            id,
            ...attr,
            class: className || null,
            style: style ? Object.entries(style).map(([key, value]) => `${key}: ${value}`).join(';') : null
        }
    });
    return element;

}
