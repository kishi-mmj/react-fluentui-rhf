import {Checkbox, DefaultButton, IStackProps, PrimaryButton, Stack, TextField} from "@fluentui/react";
import React, {useCallback, VFC} from "react";
import {Controller, useForm} from "react-hook-form";
import {FiledLabel} from "./FieldLabel";

interface FormIF {
    name: string,
    age: string,
    hobby: string[]
}

export const Form: VFC = () => {

    const {control, handleSubmit, reset} = useForm<FormIF>({
        mode: "onBlur",
        // 初期値を明示的に設定しないとリセットがうまくいかない i文字だけ残ったままになる
        defaultValues: {
            name: "",
            age: "",
            hobby: ["サッカー"]
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
                    render={({field}) => {
                        function merge(value: string) {
                            const copy = field.value.slice() as string[]
                            console.log("b", copy)
                            const index = copy.indexOf(value)
                            index > -1 ? copy.splice(index, 1) : copy.push(value)
                            console.log("a", copy)
                            field.onChange(copy)
                        }

                        return (
                            <FiledLabel
                                name={"スポーツ"}
                                htmlFor={field.name}
                                required={true}
                                w={120}
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




