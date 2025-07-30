import { IInputs, IOutputs } from "./generated/ManifestTypes";

export class NumericInputMask implements ComponentFramework.StandardControl<IInputs, IOutputs> {

    private _notifyOutputChanged: () => void;

    private _maskInput: HTMLInputElement;
    private _currentValue = "";

    /**
     * Empty constructor.
     */
    constructor() {
        // Empty
    }

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
     */
    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary,
        container: HTMLDivElement
    ): void {
        try {
            this._notifyOutputChanged = notifyOutputChanged;
            this._maskInput = document.createElement('input');
            this._maskInput.setAttribute('type', 'text');

            // Use configurable mask pattern property
            const maskTemplate = context.parameters.maskPattern?.raw || '(___) ___-____';
            this._maskInput.setAttribute('placeholder', maskTemplate);

            // Count underscores to determine max digits allowed
            const maxDigits = (maskTemplate.match(/_/g) || []).length;

            this._currentValue = context.parameters.maskField.raw || "";
            this._maskInput.value = this.applyMask(this._currentValue.replace(/\D/g, ''), maskTemplate);

            container.appendChild(this._maskInput);
            this._maskInput.addEventListener("input", (event => {
                let digits = this._maskInput.value.replace(/\D/g, '');
                // Limit to maxDigits
                digits = digits.substring(0, maxDigits);
                const masked = this.applyMask(digits, maskTemplate);
                this._maskInput.value = masked;
                this._currentValue = masked;
                notifyOutputChanged();
            }));
        }
        catch (error) {
            console.log(error);
        }
    }

    // Add this helper method for mask formatting
    private applyMask(value: string, mask: string): string {
        let masked = '';
        let digitIndex = 0;
        for (const char of mask) {
            if (char === '_') {
                if (digitIndex < value.length) {
                    masked += value[digitIndex];
                    digitIndex++;
                } else {
                    masked += '_';
                }
            } else {
                masked += char;
            }
        }
        return masked;
    }

    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     */
    public updateView(context: ComponentFramework.Context<IInputs>): void {
        try {
            const maskTemplate = context.parameters.maskPattern?.raw || '(___) ___-____';
            const newValue = context.parameters.maskField.raw || "";
            // Always apply the mask, even if value is empty
            const masked = this.applyMask(newValue.replace(/\D/g, ''), maskTemplate);
            if (masked !== this._maskInput.value) {
                this._maskInput.value = masked;
                this._currentValue = masked;
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as "bound" or "output"
     */
    public getOutputs(): IOutputs {
        return {};
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void {
        // Add code to cleanup control if necessary
    }
}
