export interface Book {
    id: string;
    filename: string;
    type: string;
    domain: string;
    faculty: string;
    school?: string;
    size?: string;
    description?: string;
    path?:string;
    image_path?:string;
    liked?:string;
}

