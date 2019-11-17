import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class Ad1573501971001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(new Table({
      name: 'ad',
      columns: [
        { name: 'id', type: 'UUID', isPrimary: true, default: 'uuid_generate_v4()', isUnique: true },
        { name: 'category_id', type: 'UUID' },
        { name: 'type', type: 'VARCHAR', length: '10', isNullable: true },
        { name: 'title', type: 'VARCHAR', length: '255', isNullable: true },
        { name: 'description', type: 'TEXT', isNullable: true },
        { name: 'assessed_value', type: 'INTEGER', isNullable: true },
        { name: 'city', type: 'VARCHAR', length: '15', isNullable: true },
        { name: 'phone_number', type: 'VARCHAR', length: '20', isNullable: true },
        { name: 'currency', type: 'VARCHAR', length: '10', isNullable: true },
        { name: 'status', type: 'VARCHAR', length: '10', isNullable: true },
        { name: 'consider_options', type: 'BOOLEAN', isNullable: true },
        { name: 'created_at', type: 'TIMESTAMP WITH TIME ZONE', default: 'NOW()' },
        { name: 'updated_at', type: 'TIMESTAMP WITH TIME ZONE', isNullable: true }
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
