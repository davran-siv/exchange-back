import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class FavoriteAd1574270096039 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(new Table({
      name: 'favorite_ad',
      columns: [
        { name: 'ad_id', type: 'UUID' },
        { name: 'user_id', type: 'UUID' }
      ]
    }), true)

    await queryRunner.createForeignKey('favorite_ad', new TableForeignKey({
      columnNames: ['ad_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'ad'
    }))

    await queryRunner.createForeignKey('favorite_ad', new TableForeignKey({
      columnNames: ['user_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'user'
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    // const table = await queryRunner.getTable('user')
    // const userForeignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('user_id') !== -1)
    // const adForeignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('ad_id') !== -1)
    // await queryRunner.dropForeignKeys('favorite_ad', [userForeignKey, adForeignKey])
    await queryRunner.dropTable('favorite_ad', true)
  }
}
