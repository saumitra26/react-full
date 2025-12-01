export interface Writer { 
    id?: number,
    name: string,
    email?:string
}
export interface writerRequest { 
    name: string,
    email:string
}
export interface ApiResponse<T> {
  message: string;
  data: T;
}
