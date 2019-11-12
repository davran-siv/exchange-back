import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class Image1573536431927 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(new Table({
      name: 'image',
      columns: [
        { name: 'id', type: 'UUID', isPrimary: true, default: 'uuid_generate_v4()', isUnique: true },
        { name: 'path', type: 'TEXT' }
      ]
    }), true)
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('image', true)
  }
}
