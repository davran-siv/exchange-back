import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('image')
export class ImageEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  path: string
}
