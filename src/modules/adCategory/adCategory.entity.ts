import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity('adCategory')
export class AdCategoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @ManyToOne(type => AdCategoryEntity, adCategory => adCategory.parentCategory)
  parentCategory: AdCategoryEntity
}
