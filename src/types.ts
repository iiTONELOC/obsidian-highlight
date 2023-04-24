export interface HighlighterSettings {
    currentColor: string;
    availableColors: string[];
}

export const DEFAULT_SETTINGS: HighlighterSettings = {
    currentColor: '#ffffff',
    availableColors: [
        '#ffffff',
        '#000000',
        '#ff0000',
        '#00ff00',
        '#0000ff',
        '#bbbb00',
        '#00ffff',
        '#ff00ff',
        '#ff7f00',
        '#7f00ff',
        '#7f3f00',
        '#ff7fff',
        '#7f7f7f',
        '#bfbfbf',
        '#3f3f3f'
    ]
};


export interface ColorPickerOptions {
    elementToMount: HTMLElement;
    color: string;
    onColorChange: (color: string) => void;
}

export interface HTMLElementData {
    Element: keyof HTMLElementTagNameMap;
    id: string;
    text?: string;
    attr?: Record<string, string>;
    class?: string;
    style?: Record<string, string>;
}
