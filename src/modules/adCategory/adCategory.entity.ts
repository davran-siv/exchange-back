import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity('ad_category')
export class AdCategoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @ManyToOne(type => AdCategoryEntity, adCategory => adCategory.parentCategory)
  @JoinColumn({ name: 'parent_category_id' })
  parentCategory: AdCategoryEntity
}
