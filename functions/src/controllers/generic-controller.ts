import * as admin from 'firebase-admin';
import * as moment from 'moment';

export class GenericController<T> {

    constructor(
        private dbRef: admin.database.Reference,
        private loggerRef?: admin.database.Reference,
    ) { }

    private async log(method: string, error: unknown) {
        if (this.loggerRef) {
            await this.loggerRef.push({
                method,
                error,
                checkin: moment.now(),
            })
        }
    }

    async list(searchBy?: { key: string, value: string }): Promise<any> {
        if (searchBy) {
            return (
                await this.dbRef.orderByChild(searchBy.key).equalTo(searchBy.value).once('value')
            ).val();
        } else {
            return (await this.dbRef.orderByChild('id').once('value')).val()
        }
    }

    async getOne(id: string): Promise<T[]> {
        return (await this.dbRef.child(id).once('value')).val();
    }

    async insert(data: T) {
        const id: string = (await this.dbRef.push()).key
        try {
            await this.dbRef.child(id).set({
                id,
                ...data
            })
        } catch (err) {
            this.log('insert', err)
        }
    }

    async delete(id: string) {
        try {
            await this.dbRef.child(id).remove()
        } catch (err) {
            this.log('insert', err)
        }
    }

    async update(id: string, data: T) {
        try {
            await this.dbRef.child(id).set({
                id,
                ...data
            })
        } catch (err) {
            this.log('insert', err)
        }
    }

}