import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { CategoryEnum } from '../../../enums/CategoryEnum';

@Entity('product')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 50, nullable: false })
  name!: string;

  @Column({ length: 50, nullable: false })
  display_name!: string;

  @Column('numeric', { nullable: false })
  price!: number;

  @Column('varchar', { array: true, nullable: true })
  image_url?: string[];

  @Column('varchar', { nullable: false })
  description?: string;

  @Column({ nullable: true })
  category?: CategoryEnum;

  @Column('varchar', { nullable: true })
  type?: string;

  @Column('varchar', { length: 12, nullable: false })
  status!: string;

  @Column('date', { nullable: false })
  created_date!: Date;

  @Column('date', { nullable: true })
  last_action_date?: Date;
}