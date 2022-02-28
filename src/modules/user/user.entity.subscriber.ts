import { EntitySubscriberInterface, EventSubscriber, InsertEvent, RemoveEvent, TransactionCommitEvent, TransactionRollbackEvent, TransactionStartEvent, UpdateEvent } from 'typeorm';
import { Logger } from '@nestjs/common';
import { UserEntity } from './user.entity';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<UserEntity> {

    listenTo(): any {
        return UserEntity;
    }


    beforeInsert(event: InsertEvent<UserEntity>): Promise<any> | void {
        console.log('Before Insert')
    }


    afterInsert(event: InsertEvent<UserEntity>): Promise<any> | void {
        console.log('After Insert')
    }


    beforeUpdate(event: UpdateEvent<UserEntity>): Promise<any> | void {
        console.log('Before Update')
    }


    afterUpdate(event: UpdateEvent<UserEntity>): Promise<any> | void {
        console.log('After Update')
    }


    beforeRemove(event: RemoveEvent<UserEntity>): Promise<any> | void {
        console.log('Before Remove')
    }


    afterRemove(event: RemoveEvent<UserEntity>): Promise<any> | void {
        console.log('After Remove')
    }


    beforeTransactionStart(event: TransactionStartEvent): Promise<any> | void {
        console.log('Before Transaction Start')
    }


    afterTransactionStart(event: TransactionStartEvent): Promise<any> | void {
        console.log('After Transaction Start')
    }

    beforeTransactionCommit(event: TransactionCommitEvent): Promise<any> | void {
        console.log('Before Transaction Commit')
    }


    afterTransactionCommit(event: TransactionCommitEvent): Promise<any> | void {
        console.log('After Transaction Commit')
    }


    beforeTransactionRollback(event: TransactionRollbackEvent): Promise<any> | void {
        console.log('Before Transaction Rollback')
    }


    afterTransactionRollback?(event: TransactionRollbackEvent): Promise<any> | void {
        console.log('After Transaction Rollback')
    }

}