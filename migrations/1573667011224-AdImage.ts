import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class AdImage1573667011224 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(new Table({
      name: 'ad_image',
      columns: [
        { name: 'ad_id', type: 'UUID' },
        { name: 'image_id', type: 'UUID' }
      ]
    }), true)

    await queryRunner.createForeignKey('ad_image', new TableForeignKey({
      columnNames: ['ad_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'ad'
    }))
    await queryRunner.createForeignKey('ad_image', new TableForeignKey({
      columnNames: ['image_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'image'
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('ad_image', true)
  }
}
