import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class InitUserTable1552545325846 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(new Table({
      name: 'user',
      columns: [
        { name: 'id', type: 'UUID', isPrimary: true, default: 'uuid_generate_v4()', isUnique: true },
        { name: 'first_name', type: 'VARCHAR', length: '255' },
        { name: 'last_name', type: 'VARCHAR', length: '255' },
        { name: 'password', type: 'VARCHAR', length: '255' },
        { name: 'is_deleted', type: 'BOOLEAN', default: false },
        { name: 'is_active', type: 'BOOLEAN', default: true },
        { name: 'photo', type: 'TEXT', isNullable: true },
        { name: 'email', type: 'VARCHAR', length: '50', isUnique: true },
        { name: 'is_email_verified', type: 'BOOLEAN', default: false },
        { name: 'phone_number', type: 'VARCHAR', length: '20', isNullable: true },
        { name: 'is_phone_verified', type: 'BOOLEAN', default: false },
        { name: 'created_at', type: 'TIMESTAMP WITH TIME ZONE', default: 'NOW()' },
        { name: 'updated_at', type: 'TIMESTAMP WITH TIME ZONE', isNullable: true }
      ]
    }), true)
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('users', true)
  }

}
