export interface Connaissance {

  _id?: string;

  title: string;

  content: string;

  tags: string[];

  color: string;

  pinned: boolean;

  archived: boolean;

  createdAt?: string;

  updatedAt?: string;

}