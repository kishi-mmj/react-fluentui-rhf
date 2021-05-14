import {
    Checkbox,
    ChoiceGroup,
    DatePicker,
    DefaultButton,
    Dropdown,
    DropdownMenuItemType,
    IChoiceGroupOption,
    IDropdownOption,
    IDropdownStyles,
    IStackProps,
    PrimaryButton,
    Stack,
    TextField
} from "@fluentui/react";
import React, {useCallback, VFC} from "react";
import {Controller, useForm} from "react-hook-form";
import {FiledLabel} from "./FieldLabel";
import {format} from "date-fns";

interface FormIF {
    name: string,
    age: string,
    hobby: string[]
    bloodType: string
    food: string
    birthDate: Date | null | undefined
}

export const Form: VFC = () => {

    const {control, handleSubmit, reset} = useForm<FormIF>({
        mode: "onBlur",
        // 初期値を明示的に設定しないとリセットがうまくいかない 文字だけ残ったままになる
        defaultValues: {
            name: "",
            age: "",
            hobby: [],
            bloodType: "",
            food: "",
            birthDate: undefined
        }
    })

    const onSave = useCallback(() => {
        handleSubmit(
            (data) => {
                console.log("ok", data);
            },
            (err) => {
                console.log("ng", err);
            }
        )();
    }, [handleSubmit])

    const columnProps: Partial<IStackProps> = {
        tokens: {childrenGap: 15},
    };

    const choiceGroupOptions: IChoiceGroupOption[] = [
        {key: 'A', text: 'A'},
        {key: 'B', text: 'B'},
        {key: 'O', text: 'O', disabled: true},
        {key: 'AB', text: 'AB'},
    ];

    const dropdownStyles: Partial<IDropdownStyles> = {
        dropdown: {width: 300},
    };

    const dropdownOptions: IDropdownOption[] = [
        {key: '', text: ''},
        {key: 'Fruits', text: 'フルーツ', itemType: DropdownMenuItemType.Header},
        {key: 'Apple', text: 'りんご'},
        {key: 'Banana', text: 'バナナ'},
        {key: 'Orange', text: 'オレンジ', disabled: true},
        {key: 'Grape', text: 'ぶどう'},
        {key: 'ボーダー', text: '-', itemType: DropdownMenuItemType.Divider},
        {key: 'Vegetables', text: '野菜', itemType: DropdownMenuItemType.Header},
        {key: 'Broccoli', text: 'ブロッコリー'},
        {key: 'Carrot', text: 'にんじん'},
        {key: 'Lettuce', text: 'レタス'},
    ];
    const onFormatDate = (date?: Date): string => {
        return date ? format(date, "yyyy/MM/dd") : ""
    };

    return (
        <Stack style={{width: 600, margin: "0 auto"}}>

            {/* labelのスタイルはべつで作成した方がいい*/}
            <Stack {...columnProps}>

                <Controller
                    control={control}
                    name={"name"}
                    rules={{
                        required: "必須入力",
                        validate: (v) => v === "kishi" || '名前が違います.'
                    }}
                    render={({field, formState}) => {
                        return (
                            <FiledLabel
                                name={"名前"}
                                htmlFor={field.name}
                                w={120}
                                required={true}
                            >
                                <TextField
                                    id={field.name}
                                    onChange={field.onChange}
                                    value={field.value}
                                    defaultValue={field.value}
                                    errorMessage={formState.errors.name?.message}
                                />
                            </FiledLabel>
                        )
                    }}
                />

                <Controller
                    control={control}
                    name={"age"}
                    rules={{required: "必須入力"}}
                    render={({field, formState}) => {
                        return (
                            <FiledLabel
                                name={"年齢"}
                                htmlFor={field.name}
                                required={true}
                                w={120}
                            >
                                <TextField
                                    id={field.name}
                                    onChange={field.onChange}
                                    value={field.value}
                                    defaultValue={field.value}
                                    errorMessage={formState.errors.age?.message}
                                />
                            </FiledLabel>
                        )
                    }}
                />

                <Controller
                    control={control}
                    name={"hobby"}
                    rules={{required: "必須入力"}}
                    render={({field, fieldState}) => {
                        function merge(value: string) {
                            const copy = (field.value || []).slice() as string[]
                            const index = copy.indexOf(value)
                            index > -1 ? copy.splice(index, 1) : copy.push(value)
                            field.onChange(copy)
                        }

                        return (
                            <FiledLabel
                                name={"スポーツ"}
                                htmlFor={field.name}
                                required={true}
                                w={120}
                                errorText={fieldState.error?.message}
                            >
                                <Stack tokens={{childrenGap: 10}}>
                                    <Checkbox
                                        label="野球"
                                        checked={field.value?.includes("野球")}
                                        onChange={() => merge("野球")}
                                    />
                                    <Checkbox
                                        label="サッカー"
                                        checked={field.value?.includes("サッカー")}
                                        onChange={() => merge("サッカー")}
                                    />
                                    <Checkbox
                                        label="テニス"
                                        checked={field.value?.includes("テニス")}
                                        onChange={() => merge("テニス")}
                                    />
                                    <Checkbox
                                        {...field}
                                        label="ラグビー"
                                        checked={field.value?.includes("ラグビー")}
                                        onChange={() => merge("ラグビー")}
                                    />
                                </Stack>
                            </FiledLabel>
                        )
                    }}
                />
                <Controller
                    control={control}
                    name={"bloodType"}
                    rules={{required: "必須入力"}}
                    render={({field, formState, fieldState}) => {
                        return (
                            <FiledLabel
                                name={"血液型"}
                                htmlFor={field.name}
                                required={true}
                                w={120}
                                errorText={fieldState.error?.message}
                            >
                                <ChoiceGroup
                                    id={field.name}
                                    selectedKey={field.value}
                                    options={choiceGroupOptions}
                                    onChange={(_, o) => field.onChange(o?.key)}
                                />
                            </FiledLabel>
                        )
                    }}
                />

                <Controller
                    control={control}
                    name={"food"}
                    rules={{required: "必須入力"}}
                    render={({field, fieldState}) => {
                        return (
                            <FiledLabel
                                name={"食べ物"}
                                htmlFor={field.name}
                                required={true}
                                w={120}
                                errorText={fieldState.error?.message}
                            >
                                <Dropdown
                                    id={field.name}
                                    options={dropdownOptions}
                                    styles={dropdownStyles}
                                    defaultSelectedKey={field.value}
                                    onChange={(e, o) => field.onChange(o?.key)}
                                />
                            </FiledLabel>
                        )
                    }}
                />

                <Controller
                    control={control}
                    name={"birthDate"}
                    rules={{required: "必須入力"}}
                    render={({field, formState, fieldState}) => {
                        return (
                            <FiledLabel
                                name={"生年月日"}
                                htmlFor={field.name}
                                required={true}
                                w={120}
                            >
                                <DatePicker
                                    id={field.name}
                                    value={field.value || undefined}
                                    textField={{errorMessage: fieldState.error?.message}}
                                    onSelectDate={(date) => field.onChange(date)}
                                    formatDate={onFormatDate}
                                />
                            </FiledLabel>
                        )
                    }}
                />

                <Stack tokens={{childrenGap: 10}} horizontal horizontalAlign={"end"}>
                    <Stack.Item>
                        <DefaultButton text="reset" onClick={() => reset()}/>
                    </Stack.Item>
                    <Stack.Item>
                        <PrimaryButton text="submit" onClick={onSave}
                        />
                    </Stack.Item>
                </Stack>

            </Stack>

        </Stack>
    )
}




