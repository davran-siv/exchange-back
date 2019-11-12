import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class Ad1573501971001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(new Table({
      name: 'ad',
      columns: [
        { name: 'id', type: 'UUID', isPrimary: true, default: 'uuid_generate_v4()', isUnique: true },
        { name: 'category_id', type: 'UUID' },
        { name: 'type', type: 'VARCHAR', length: '10' },
        { name: 'title', type: 'VARCHAR', length: '255' },
        { name: 'description', type: 'TEXT' },
        { name: 'assessed_value', type: 'INTEGER' },
        { name: 'city', type: 'VARCHAR', length: '15' },
        { name: 'phone_number', type: 'VARCHAR', length: '20' },
        { name: 'currency', type: 'VARCHAR', length: '10' },
        { name: 'status', type: 'VARCHAR', length: '10' }
      ]
    }), true)

    await queryRunner.createForeignKey('ad', new TableForeignKey({
      columnNames: ['category_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'ad_category'
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('ad', true)
  }

}
