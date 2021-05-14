import {
    Checkbox,
    ChoiceGroup,
    ComboBox,
    DatePicker,
    DefaultButton,
    Dropdown,
    DropdownMenuItemType,
    IChoiceGroupOption,
    IComboBoxOption,
    IComboBoxStyles,
    IDropdownOption,
    IDropdownStyles,
    IStackProps,
    IStackTokens,
    PrimaryButton,
    SelectableOptionMenuItemType,
    Stack,
    TextField
} from "@fluentui/react";
import React, {useCallback, VFC} from "react";
import {Controller, useForm} from "react-hook-form";
import {FiledLabel} from "./FieldLabel";
import {FormatDate} from "./util/FormatDate";
import {toggleFromArray} from "./util/ToggleFromArray";

interface FormIF {
    name: string,
    age: string,
    hobby: string[]
    bloodType: string
    food: string
    birthDate: Date | null | undefined
    job: string
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
            birthDate: undefined,
            job: "G"
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

    // choiceGroup
    const choiceGroupOptions: IChoiceGroupOption[] = [
        {key: 'A', text: 'A'},
        {key: 'B', text: 'B'},
        {key: 'O', text: 'O', disabled: true},
        {key: 'AB', text: 'AB'},
    ];

    // dropdown
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

    // comboBox
    const comboBoxOptions: IComboBoxOption[] = [
        {key: 'Header1', text: 'First heading', itemType: SelectableOptionMenuItemType.Header},
        {key: 'A', text: 'Option A'},
        {key: 'B', text: 'Option B'},
        {key: 'C', text: 'Option C'},
        {key: 'D', text: 'Option D'},
        {key: 'divider', text: '-', itemType: SelectableOptionMenuItemType.Divider},
        {key: 'Header2', text: 'Second heading', itemType: SelectableOptionMenuItemType.Header},
        {key: 'E', text: 'Option E'},
        {key: 'F', text: 'Option F', disabled: true},
        {key: 'G', text: 'Option G'},
        {key: 'H', text: 'Option H'},
        {key: 'I', text: 'Option I'},
        {key: 'J', text: 'Option J'},
    ];
// Optional styling to make the example look nicer
    const comboBoxStyles: Partial<IComboBoxStyles> = {root: {maxWidth: 600}};

    return (
        <Stack style={{width: 600, margin: "0 auto"}}>

            {/* labelのスタイルはべつで作成した方がいい*/}
            <Stack {...columnProps}>

                <Controller
                    control={control}
                    name={"name"}
                    rules={{
                        required: "必須入力",
                        validate: (v) => v === "name" || '名前が違います.'
                    }}
                    render={({field, formState}) => {
                        return (
                            <FiledLabel
                                label={"名前"}
                                htmlFor={field.name}
                                required={true}
                            >
                                <TextField
                                    id={field.name}
                                    onChange={field.onChange}
                                    value={field.value}
                                    defaultValue={field.value}
                                    errorMessage={formState.errors.name?.message}
                                    placeholder={`'name'と入力`}
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
                                label={"年齢"}
                                htmlFor={field.name}
                                required={true}
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
                            field.onChange(toggleFromArray(field.value, value))
                        }

                        return (
                            <FiledLabel
                                label={"スポーツ"}
                                htmlFor={field.name}
                                required={true}
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
                    render={({field, fieldState}) => {
                        return (
                            <FiledLabel
                                label={"血液型"}
                                htmlFor={field.name}
                                required={true}
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
                                label={"食べ物"}
                                htmlFor={field.name}
                                required={true}
                            >
                                <Dropdown
                                    id={field.name}
                                    options={dropdownOptions}
                                    styles={dropdownStyles}
                                    defaultSelectedKey={field.value}
                                    errorMessage={fieldState.error?.message}
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
                    render={({field, fieldState}) => {
                        return (
                            <FiledLabel
                                label={"生年月日"}
                                htmlFor={field.name}
                                required={true}
                            >
                                <DatePicker
                                    id={field.name}
                                    value={field.value || undefined}
                                    textField={{errorMessage: fieldState.error?.message}}
                                    onSelectDate={(date) => field.onChange(date)}
                                    formatDate={FormatDate}
                                />
                            </FiledLabel>
                        )
                    }}
                />


                <Controller
                    control={control}
                    name={"job"}
                    rules={{required: "必須入力"}}
                    render={({field, fieldState}) => {
                        function fixDisplayValue(v: string) {
                            let text: string | undefined = v
                            comboBoxOptions?.some(e => {
                                if (e.key === v) {
                                    text = e.text
                                    return
                                }
                            })
                            return text
                        }
                        return (
                            <FiledLabel
                                label={"職業"}
                                htmlFor={field.name}
                                required={true}
                            >
                                <ComboBox
                                    id={field.name}
                                    text={fixDisplayValue(field.value)}
                                    defaultValue={field.value || undefined}
                                    selectedKey={field.value || undefined}
                                    allowFreeform={true}
                                    autoComplete={'on'}
                                    options={comboBoxOptions}
                                    styles={comboBoxStyles}
                                    errorMessage={fieldState.error?.message}
                                    onChange={(_1, option, _2, value) => field.onChange(option?.key || value)}
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




