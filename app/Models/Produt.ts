import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Produt extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public product_code:String

  @column()
  public name:String

  @column()
  public description:String

  @column()
  public type:String

  @column()
  public unit_price:Number

  @column()
  public bought_price:Number

  @column()
  public quantity_in_stock:String

  @column()
  public user_id:Number


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

}
