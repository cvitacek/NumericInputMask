# NumericInputMask PCF Control

A PowerApps PCF control that displays a single text field masked with a configurable pattern (e.g., phone numbers). The mask pattern is fully configurable via the `maskPattern` property.

## Features

- Configurable mask template (e.g., `(___) ___-____`)
- Always displays the mask template, updating as the user types
- Supports any mask pattern using underscores (`_`) as digit placeholders

## Usage

1. **Add the control to your PowerApps environment.**
2. **Bind the `maskField` property** to the text field you want to mask.
3. **Set the `maskPattern` property** to your desired template, e.g.:
   - US Phone: `(___) ___-____`
   - Custom: `____-____`

## Properties

| Property      | Type             | Usage   | Description                                      |
|---------------|------------------|---------|--------------------------------------------------|
| maskField     | SingleLine.Text  | bound   | The field to display and store the masked value. |
| maskPattern   | SingleLine.Text  | input   | The mask template, e.g. `(___) ___-____`.        |

## Example

If you set `maskPattern` to `(___) ___-____`, the control will display:

```
(___) ___-____
```
As the user types, digits fill the underscores.

## License

This project is licensed under the [MIT License](LICENSE).

---
**Author:** Chris  
**Version:** 0.0.1
