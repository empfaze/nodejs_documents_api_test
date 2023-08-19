import { Document } from '../entities';
import { DocumentDto } from '../dto';

export interface IDocumentsService {
  create: (dto: DocumentDto) => Promise<Document | null>;
  read: () => Promise<Document[]>;
  update: (dto: DocumentDto) => void;
  delete: (id: number) => void;
}