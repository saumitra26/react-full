export interface Book {
  id?: number;
  name: string;
  type: string;
  description: string;
  writer_id: number;
  price: number;
  published_date: string;
  total_sell: number;
}
export interface BookRequest {
  name: string;
  type: string;
  description: string;
  writer_id: number;
  price: number;
  published_date: string;
  total_sell: number;
}

