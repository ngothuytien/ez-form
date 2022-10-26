import { NamePath } from "@/models/Base";
import {
	Rules,
	ValidateError,
	ValidateMessages,
	ValidateOption,
	ValidateTrigger,
} from "@/models/Validation";
import { ComputedRef, Ref } from "vue";

export interface FormField {
	name: ComputedRef<NamePath>;
	id: ComputedRef<string>;
	validate: (options?: ValidateOption) => Promise<any>;
	clearValidate: () => void;
	value: ComputedRef<any>;
	error: ComputedRef<ValidateError | undefined>;
}

export interface FormInstance<
	Values extends object = Record<string | number | symbol, any>
> {
	values: Values;
	errors: ValidateError[];
	getFieldValue(name: NamePath): any;
	setFieldValue(name: NamePath, value: any): void;
	validate(name?: string | NamePath[], options?: ValidateOption): Promise<any>;
	submit: () => void;
	reset: (values?: Values, notify?: boolean) => void;
	validateTrigger?: ValidateTrigger | ValidateTrigger[];
}

export interface InnerFormInstance<
	V extends object = Record<string | number | symbol, any>
> extends FormInstance<V> {
	formRef: Ref<HTMLFormElement | undefined>;
	handleSubmit(values: V): void;
}

export interface FormInjectedValues extends FormInstance {
	addField(field: FormField): void;
	removeField(namePath: NamePath): void;
	rules?: Rules;
	validateMessages?: ValidateMessages;
	classPrefix: string;
}

export const $formInjectKey = Symbol();

export type FormExposed = Omit<FormInstance, "validateTrigger" | "validate">;