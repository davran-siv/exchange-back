import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('users')
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

  @Column({ name: 'created_at', type: 'time without time zone' })
  createdAt: Date

  @Column({ name: 'updated_at', type: 'time without time zone' })
  updatedAt: Date

  @Column({ name: 'email_address', type: 'varchar' })
  emailAddress: string

  @Column({ name: 'is_email_verified', default: false })
  isEmailVerified: boolean

  @Column({ name: 'phone_number', type: 'varchar' })
  phoneNumber: string

  @Column({ name: 'is_phone_verified', default: false })
  isPhoneVerified: boolean

  @Column({ type: 'varchar' })
  photo: string

}
