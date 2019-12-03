import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { AdEntity } from '../ad/ad.entity'

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'first_name' })
  firstName: string

  @Column({ name: 'last_name' })
  lastName: string

  @Column({ type: 'varchar', length: 255, select: false })
  password: string

  @Column({ name: 'is_deleted', default: false, type: 'boolean' })
  isDeleted: boolean

  @Column({ name: 'is_active', default: true })
  isActive: boolean

  @Column({ name: 'email_address', type: 'varchar' })
  email: string

  @Column({ name: 'is_email_verified', default: false })
  isEmailVerified: boolean

  @Column({ name: 'phone_number', type: 'varchar' })
  phoneNumber: string

  @Column({ name: 'is_phone_verified', default: false })
  isPhoneVerified: boolean

  @Column({ type: 'varchar' })
  photo: string

  @Column({ name: 'created_at', type: 'time without time zone' })
  createdAt: Date

  @Column({ name: 'updated_at', type: 'time without time zone' })
  updatedAt: Date

  @OneToMany(type => AdEntity, ads => ads.author)
  ads: AdEntity[]

  @ManyToMany(type => AdEntity)
  @JoinTable({
    name: 'favorite_ad',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'ad_id', referencedColumnName: 'id' }
  })
  favoriteAds: AdEntity[]
}
