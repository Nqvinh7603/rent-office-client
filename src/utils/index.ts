import { snakeCase } from "change-case";
import dayjs from "dayjs";
import { useEffect } from "react";
import { FileType } from "../interfaces/common";

export function formatTimestamp(timestamp: string) {
    return dayjs(timestamp).format("DD-MM-YYYY HH:mm:ss");
}

export function useDynamicTitle(title: string) {
    useEffect(() => {
        document.title = title;
    }, [title]);
}

export async function getBase64(file: FileType): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });
}


export function toSnakeCase(obj: any): any {
    if (Array.isArray(obj)) {
        return obj.map(toSnakeCase);
    } else if (obj !== null && typeof obj === "object") {
        return Object.entries(obj).reduce((acc, [key, value]) => {
            acc[snakeCase(key)] = toSnakeCase(value);
            return acc;
        }, {} as Record<string, any>);
    }
    return obj;
}


export const normalizeString = (str: string) => str.replace(/_/g, " ").toLowerCase().trim();


export function formatCurrency(value: number | undefined): string {
    return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function parseCurrency(value: string | undefined): number {
    return (value?.replace(/\$\s?|(,*)/g, "") as unknown as number) || 0;
}

