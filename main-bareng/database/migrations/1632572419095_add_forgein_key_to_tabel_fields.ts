import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Fields extends BaseSchema {
  protected tableName = 'fields'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('venue_id').unsigned().references('id').inTable('venues')
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('venue_id')
    })
  }
}
