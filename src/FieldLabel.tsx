import {Label, Stack, Text} from "@fluentui/react";
import {ILabelProps} from "@fluentui/react/lib/components/Label/Label.types";
import {IStackItemProps} from "@fluentui/react/lib/components/Stack/StackItem/StackItem.types";
import {ITextProps} from "@fluentui/react/lib/components/Text/Text.types";
import React, {FC} from "react";

export const FiledLabel: FC<ILabelProps & { label: string, w?: number | string, errorText?: string, direction?: "horizon" | "vertical" }> = (props
) => {

    const columnProps: Partial<ILabelProps> = {
        style: {marginRight: 8, width: props.w}
    };

    const textStyleProps: Partial<ITextProps> = {
        style: {
            // animationNameはfluentuiに依存しているので注意
            animationName: "css-1, css-14",
            animationDuration: "0.367s",
            animationTimingFunction: "cubic-bezier(0.1, 0.9, 0.2, 1)",
            animationFillMode: "both",
            fontSize: "12px",
            fontWeight: 400,
            color: "rgb(164, 38, 44)",
            margin: 0,
            paddingTop: "5px",
            display: "flex",
            alignItems: "center",
        }
    };

    const iStackItemProps = props.direction === "vertical" ? {horizontal: false} : {
        horizontal: true,
        horizontalAlign: "baseline"
    } as IStackItemProps

    return (
        <Stack {...iStackItemProps}>
            <Label {...props} {...columnProps}>{props.label}</Label>
            <div>
                <div>{props.children}</div>
                {props.errorText && <div><Text {...textStyleProps}>{props.errorText}</Text></div>}
            </div>
        </Stack>
    )
}