import { Column, Entity, JoinColumn, PrimaryGeneratedColumn, Tree, TreeChildren, TreeParent } from 'typeorm'

@Tree('materialized-path')
@Entity('ad_category')
export class AdCategoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @TreeParent()
  @JoinColumn({ name: 'parent_id' })
  parent: AdCategoryEntity

  @TreeChildren()
  children: AdCategoryEntity[]
}
