import {Label, Stack} from "@fluentui/react";
import {ILabelProps} from "@fluentui/react/lib/components/Label/Label.types";
import React, {FC} from "react";

export const FiledLabel: FC<ILabelProps & {name: string, w?: number | string}> = (props) => {

    const columnProps: Partial<ILabelProps> = {
        style: {marginRight: 8, width: props.w}
    };

    return (
        <Stack horizontal horizontalAlign={"baseline"}>
            <Label {...props} {...columnProps}>{props.name}</Label>
            {props.children}
        </Stack>
    )
}