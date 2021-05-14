import {format} from "date-fns";

export const FormatDate = (date?: Date, formatStyle: string = "yyyy/MM/dd"): string => {
    return date ? format(date, formatStyle) : ""
};