import { NextComponentType } from 'next';

export type IFooterType = NextComponentType & {
    link: string,
    poweredBy: string
}