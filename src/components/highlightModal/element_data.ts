import { HTMLElementData } from '../../types';
// DOM element IDs
export const HIGHLIGHT_MODAL_TITLE_ID = 'highlight-modal-title';

// DOM element data
export const MODAL_TITLE: HTMLElementData = {
    Element: 'h2' as keyof HTMLElementTagNameMap,
    id: HIGHLIGHT_MODAL_TITLE_ID,
    text: 'Highlighter',
    class: 'highlight-modal-title'
};

export const COLOR_CONTAINER: HTMLElementData = {
    Element: 'div' as keyof HTMLElementTagNameMap,
    id: 'color-container',
    class: 'color-container'
};

export const CURRENT_COLOR_CONTAINER: HTMLElementData = {
    Element: 'div' as keyof HTMLElementTagNameMap,
    id: 'current-color-container',
    class: 'current-color-container'
};

export const CURRENT_COLOR_TITLE: HTMLElementData = {
    Element: 'h3' as keyof HTMLElementTagNameMap,
    id: 'current-color-title',
    text: 'Current Color: ',
    class: 'current-color-title'
};

export const CURRENT_COLOR_PREVIEW: HTMLElementData = {
    Element: 'span' as keyof HTMLElementTagNameMap,
    id: 'current-color-preview',
    class: 'current-color-preview'
};

export const AVAILABLE_COLORS_CONTAINER: HTMLElementData = {
    Element: 'div' as keyof HTMLElementTagNameMap,
    id: 'available-colors-container',
    class: 'available-colors-container'
};

export const AVAILABLE_COLOR_ELEMENT: HTMLElementData = {
    Element: 'div' as keyof HTMLElementTagNameMap,
    id: 'available-color-element',
    class: 'available-color-element'
};
