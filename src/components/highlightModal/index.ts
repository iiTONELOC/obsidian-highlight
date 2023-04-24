import Highlighter from 'main';
import { Modal } from 'obsidian';
import render from 'src/utils/renderer';
import { DEFAULT_SETTINGS } from 'src/types';
import {
    COLOR_CONTAINER, CURRENT_COLOR_CONTAINER, CURRENT_COLOR_PREVIEW, CURRENT_COLOR_TITLE,
    AVAILABLE_COLORS_CONTAINER, AVAILABLE_COLOR_ELEMENT,
    MODAL_TITLE
} from './element_data';


export class HighlightModal extends Modal {
    highlighter: Highlighter;
    isOpen: boolean;

    constructor(highlighter: Highlighter) {
        super(highlighter.app);
        this.highlighter = highlighter;
        this.isOpen = false;
    }

    async onOpen() {
        this.isOpen = true;
        await this._display();
    }

    onClose() {
        const { contentEl } = this;
        this.isOpen = false;
        contentEl.empty();
    }

    async _display() {
        const { contentEl } = this;

        // Render the title
        render(MODAL_TITLE, contentEl);

        // render the color container
        const colorContainerEl = render(COLOR_CONTAINER, contentEl);

        // render the current color container to the color container
        const currentColorContainerEl = render(CURRENT_COLOR_CONTAINER, colorContainerEl);
        // render the title to the current color container
        render(CURRENT_COLOR_TITLE, currentColorContainerEl);

        // render the preview to the current color container
        const currentColorPreviewEl = render(CURRENT_COLOR_PREVIEW, currentColorContainerEl);
        // set the background color of the preview to the current color
        currentColorPreviewEl.style.backgroundColor = this.highlighter?.settings?.currentColor || '#ffffff';

        // render the available colors container to the color container
        const availableColorsContainerEl = render(AVAILABLE_COLORS_CONTAINER, colorContainerEl);

        const { availableColors }: typeof DEFAULT_SETTINGS = DEFAULT_SETTINGS;

        availableColors.forEach((color: string) => {
            const availableColorElement = render(AVAILABLE_COLOR_ELEMENT, availableColorsContainerEl);
            availableColorElement.setAttribute('data-color', color);
            availableColorElement.style.backgroundColor = color;
            availableColorElement.addEventListener('click', (event) => {
                const color = (event.target as HTMLElement).getAttribute('data-color');
                color && (this.highlighter.settings.currentColor = color);
                color && (async () => await this.highlighter.updateColorState(color))();
                color && (currentColorPreviewEl.style.backgroundColor = this.highlighter?.settings?.currentColor || '#ffffff');
                //close the modal
                this.close();
            });
        });
    }

}
