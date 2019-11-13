import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class Image1573536431927 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(new Table({
      name: 'image',
      columns: [
        { name: 'id', type: 'UUID', isPrimary: true, default: 'uuid_generate_v4()', isUnique: true },
        { name: 'path', type: 'TEXT' },
        { name: 'created_at', type: 'TIMESTAMP WITH TIME ZONE', default: 'NOW()' },
        { name: 'updated_at', type: 'TIMESTAMP WITH TIME ZONE', isNullable: true }
      ]
    }), true)
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('image', true)
  }
}
