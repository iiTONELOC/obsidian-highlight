import { ColorComponent } from 'obsidian';
import { ColorPickerOptions } from 'src/types';


export function createColorPicker(options: ColorPickerOptions): ColorComponent {
    const { elementToMount, color, onColorChange }: ColorPickerOptions = options;
    const container: HTMLDivElement = elementToMount as HTMLDivElement;

    const colorPicker = new ColorComponent(container);

    colorPicker.setValue(color);

    colorPicker.onChange((color: string) => {
        onColorChange(color);
    });

    return colorPicker;
}
