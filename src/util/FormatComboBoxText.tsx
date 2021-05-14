import {IComboBoxOption} from "@fluentui/react";
import {Option} from "../Form";

export function formatComboBoxText(options: Array<IComboBoxOption & Option>, v: string = "") {
    let text: string = v
    options?.forEach((e) => {
        if (e.key === v) {
            text = e.text
            return
        }
    })
    return text
}
