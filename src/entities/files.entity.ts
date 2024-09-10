import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'files' })
export class FileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'file_path', nullable: false })
  filePath: string;

  @Column({ name: 'file_type', nullable: false })
  fileType: string;
}
