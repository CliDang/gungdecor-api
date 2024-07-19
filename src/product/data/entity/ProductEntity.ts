import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('product')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 50, nullable: true })
  name?: string;

  @Column({ length: 50, nullable: true })
  display_name?: string;

  @Column('numeric', { nullable: true })
  price?: number;

  @Column('varchar', { array: true, nullable: true })
  image_url?: string[];

  @Column('varchar', { nullable: true })
  description?: string;

  @Column({ nullable: true })
  category_id?: number;

  @Column('varchar', { nullable: true })
  type?: string;

  @Column('varchar', { length: 12, nullable: true })
  status?: string;

  @Column('date', { nullable: true })
  created_date?: Date;

  @Column('date', { nullable: true })
  last_action_date?: Date;
}