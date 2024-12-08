import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Repository,
  Unique,
  UpdateDateColumn,
} from 'typeorm'

import { messages } from 'api/core/constants'

type SerializerProps = { [key: string]: unknown }

abstract class ModelBase extends BaseEntity {
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  static serializer(_data: SerializerProps): SerializerProps {
    throw new Error(messages.NOT_IMPLEMENTED)
  }
}

export {
  ModelBase,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  Repository,
  BeforeInsert,
  OneToMany,
  Unique,
  ManyToOne,
  JoinColumn,
}
