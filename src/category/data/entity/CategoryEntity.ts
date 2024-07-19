import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('category')
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 32, nullable: true })
  name?: string;

  @Column({ length: 32, nullable: true })
  display_name?: string;

  @Column('varchar', { nullable: true })
  description?: string;

  @Column('varchar', { array: true, nullable: true })
  image_url?: string[];

  @Column('varchar', { length: 12, nullable: true })
  status?: string;

  @Column('date', { nullable: true })
  created_date?: Date;

  @Column('date', { nullable: true })
  last_action_date?: Date;
}
