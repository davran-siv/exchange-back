import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { AdStatus, AdType, City, CurrencyType } from '../../consts'
import { AdCategoryEntity } from '../adCategory/adCategory.entity'
import { ImageEntity } from '../image/image.entity'
import { UserEntity } from '../user/user.entity'

@Entity('ad')
export class AdEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'title' })
  title: string

  @Column({ enum: AdType })
  type: AdType

  @Column({ type: 'text' })
  description: string

  @Column({ name: 'assessed_value', type: 'integer' })
  assessedValue: number

  @Column({ name: 'phone_number', type: 'varchar' })
  phoneNumber: string

  @Column({ name: 'consider_options', type: 'boolean', default: false })
  considerOptions: string

  @Column({ enum: City })
  city: City

  @Column({ enum: CurrencyType })
  currency: CurrencyType

  @Column({ enum: AdStatus })
  status: AdStatus

  @ManyToOne(type => AdCategoryEntity, { eager: true })
  @JoinColumn({ name: 'category_id' })
  category: AdCategoryEntity

  @ManyToOne(type => UserEntity, author => author.ads, { eager: true })
  @JoinColumn({ name: 'author_id' })
  author: UserEntity

  @ManyToMany(type => AdCategoryEntity, { eager: true })
  @JoinTable({
    name: 'ad_interest',
    joinColumn: { name: 'ad_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'ad_category_id', referencedColumnName: 'id' }
  })
  interests: AdCategoryEntity[]

  @ManyToMany(type => ImageEntity, { eager: true })
  @JoinTable({
    name: 'ad_image',
    joinColumn: { name: 'ad_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'image_id', referencedColumnName: 'id' }
  })
  images: ImageEntity[]

  @Column({ name: 'created_at', type: 'time without time zone' })
  createdAt: Date

  @Column({ name: 'updated_at', type: 'time without time zone' })
  updatedAt: Date

  @ManyToMany(type => UserEntity)
  @JoinTable({
    name: 'favorite_ad',
    joinColumn: { name: 'ad_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id' }
  })
  favoriteToUsers: UserEntity[]
}
