import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class AdCategory1573501970001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(new Table({
      name: 'ad_category',
      columns: [
        { name: 'id', type: 'UUID', isPrimary: true, default: 'uuid_generate_v4()', isUnique: true },
        { name: 'parent_category_id', type: 'UUID', isNullable: true },
        { name: 'name', type: 'VARCHAR', length: '50' }
      ]
    }), true)

    await queryRunner.createForeignKey('ad_category', new TableForeignKey({
      columnNames: ['parent_category_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'ad_category'
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('ad_category', true)
  }
}
