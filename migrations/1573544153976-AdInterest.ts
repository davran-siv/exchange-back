import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class AdInterest1573544153976 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(new Table({
      name: 'ad_interest',
      columns: [
        { name: 'ad_id', type: 'UUID' },
        { name: 'ad_category_id', type: 'UUID' }
      ]
    }), true)

    await queryRunner.createForeignKey('ad_interest', new TableForeignKey({
      columnNames: ['ad_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'ad'
    }))
    await queryRunner.createForeignKey('ad_interest', new TableForeignKey({
      columnNames: ['ad_category_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'ad_category'
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('ad_interest', true)
  }
}
