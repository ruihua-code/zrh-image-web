declare module '*.css';
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';
declare module '*.mp4';

declare module '*.scss' {
    const content: { [key: string]: any };
    export default content;
}

declare module '*.less' {
    const content: { [key: string]: any };
    export default content;
}

declare module '*.less?rem' {
    const content: { [key: string]: any };
    export default content;
}

declare module '*.svg' {
    import * as React from 'react';
    
    export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    const src: string;
    export default src;
}

declare module '*.json' {
    const value: any;
    export const version: string;
    export default value;
}

declare module 'moment' {
    import { Dayjs } from 'dayjs';

    namespace moment {
        type Moment = Dayjs;
    }
    export = moment;
    export as namespace moment;
}
