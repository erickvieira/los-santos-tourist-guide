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
            });
        }
    }

    async getList(searchBy?: { key: string, value: string }): Promise<T[]> {
        const list: T[] = [];
        const handleResult = async (snapshot: admin.database.DataSnapshot) => {
            if (snapshot.exists()) {
                await snapshot.forEach(data => {
                    list.push(data.val());
                });
                return list;
            } else {
                throw(Error(`the required list has no items`));
            }
        };
        if (searchBy) {
            const snapshot = await this.dbRef.orderByChild(
                searchBy.key
            ).equalTo(searchBy.value).once('value');
            return await handleResult(snapshot);
        } else {
            const snapshot = await this.dbRef.orderByPriority().once('value');
            return await handleResult(snapshot);
        }
    }

    async getOne(id: string): Promise<T> {
        const snapshot = await this.dbRef.child(id).once('value');
        if (snapshot.exists()) {
            return snapshot.val();
        } else {
            throw Error(`id #${id} not found`);
        }
    }

    async insert(data: T) {
        const id: string = (await this.dbRef.push()).key;
        try {
            await this.dbRef.child(id).set({
                id,
                ...data
            });
        } catch (err) {
            this.log('insert', err);
        }
    }

    async delete(id: string) {
        try {
            await this.dbRef.child(id).remove();
        } catch (err) {
            this.log('insert', err);
        }
    }

    async update(id: string, data: T) {
        try {
            await this.dbRef.child(id).set({
                id,
                ...data
            });
        } catch (err) {
            this.log('insert', err);
        }
    }

}
