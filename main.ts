import { App, Editor, MarkdownView, Plugin, PluginManifest } from 'obsidian';
import { mark, HighlightModal, HighlighterSettings, DEFAULT_SETTINGS } from 'src';
import removeMarkup from 'src/utils/removeMarkup';
import 'styles.css';

const HIGHLIGHT_COLOR = 'highlight-color';
const RIBBON_ICON_ID = 'highlighter-ribbon-icon';
const colorsThatMessWithIcon: string[] = [
	'#ffffff', '#bbbb00', '#00ffff', '#ff00ff',
	'#ff7f00', '#ff7fff', '#7f7f7f', '#bfbfbf',
	'#00ff00'
];


export default class Highlighter extends Plugin {
	settings: HighlighterSettings;

	constructor(app: App, manifest: PluginManifest) {
		super(app, manifest);
		this.settings = DEFAULT_SETTINGS;
	}

	async onload() {
		await this.loadSettings();

		/**CREATED COMPONENTS */

		// create the menu interface modal
		const modal = new HighlightModal(this);

		// create the sidebar ribbon icon
		const ribbonIconEl = this.addRibbonIcon(
			'highlighter',
			'My Highlighter',
			(evt: MouseEvent) => {
				evt.preventDefault();
				evt.stopPropagation();

				if (!modal.isOpen) {
					modal.open();
				} else {
					modal.close();
				}
			});

		ribbonIconEl.id = RIBBON_ICON_ID;
		ribbonIconEl.style.backgroundColor = this.settings.currentColor;
		this.handleTextColor(this.settings.currentColor, ribbonIconEl);

		/** COMMAND PALETTE */

		// Command for opening the modal
		this.addCommand({
			id: 'open-highlight-modal',
			name: 'Open Highlighter',
			callback: () => {
				modal.open();
			},
			hotkeys: [
				// ctrl + shift + h
				{
					modifiers: ['Mod', 'Shift'],
					key: 'h'
				}
			]
		});


		// Highlights the selected text with the current color
		this.addCommand({
			id: 'Highlight-editor-command',
			name: 'Highlight editor command',
			// @ts-ignore
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const selectedText = editor.getSelection();
				editor.replaceSelection(mark(this.settings.currentColor, '#fff', selectedText));
			},

			hotkeys: [
				// ctrl + h
				{
					modifiers: ['Mod'],
					key: 'm'
				}
			]
		});

		// Removes the highlight from the selected text
		this.addCommand({
			id: 'Remove-highlight-editor-command',
			name: 'Remove-highlight editor command',
			// @ts-ignore
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const selectedText = editor.getSelection();
				editor.replaceSelection(removeMarkup(selectedText));
			},
			hotkeys: [
				// ctrl + r
				{
					modifiers: ['Mod'],
					key: 'r'
				}
			]
		});

	}

	// onunload() {

	// }

	/**
	 * Updates the plugin's current color state and saves it to local storage
	 * @param color A hex color string
	 */
	async updateColorState(color: string) {
		this.settings.currentColor = color;
		localStorage.setItem(HIGHLIGHT_COLOR, this.settings.currentColor);
		this.updateRibbonIconColor(color);
		await this.saveSettings();
	}

	/**
	 * Updates the ribbon icon's color
	 * @param color A hex color string
	 */
	updateRibbonIconColor(color: string) {
		const ribbonIconEl = document.getElementById(RIBBON_ICON_ID);

		if (ribbonIconEl) {
			ribbonIconEl.style.backgroundColor = color;
			this.handleTextColor(color, ribbonIconEl);
		}
	}

	handleTextColor(color: string, el: HTMLElement) {
		if (colorsThatMessWithIcon.includes(color)) {
			el.style.color = 'black';
		} else {
			el.style.color = 'inherit';
		}
	}

	highLightSelectedText(selectedText: string): HTMLElement {
		const markEl = document.createElement('mark');
		markEl.innerText = selectedText;
		markEl.style.backgroundColor = this.settings.currentColor;
		this.handleTextColor(this.settings.currentColor, markEl);
		return markEl;
	}

	/**
	 * Assigns the default settings to the plugin settings and loads any saved settings
	 */
	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
		this.settings.currentColor = localStorage.getItem(HIGHLIGHT_COLOR) || DEFAULT_SETTINGS.currentColor;
		localStorage.setItem(HIGHLIGHT_COLOR, this.settings.currentColor);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
