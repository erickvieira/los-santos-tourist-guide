import * as request from 'request';

export class GenericController<T> {

  private bdUrl = 'https://los-santos-tourist-guide.firebaseio.com';

  constructor(
    private tableName: string
  ) { }

  async getList(): Promise<T[]> {
    return new Promise<T[]>((resolve, reject) => {
      request(`${this.bdUrl}/${this.tableName}.json`, (err, res: any) => {
        if (err) {
          reject({ err });
        } else {
          resolve([].map.call(Object.values(JSON.parse(res.body || '{}')), (v: T) => {
            return v;
          }) as T[]);
        }
      });
    });
  }

  async getOne(id: string): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      request(`${this.bdUrl}/${this.tableName}/${id}.json`, (err, res: any) => {
        if (err) {
          reject({ err });
        } else {
          resolve(JSON.parse(res.body));
        }
      });
    });
  }

  protected async insert(data: T | Partial<T>, keyCompose: string[]) {
    let id = ``;
    if (!keyCompose || keyCompose.length === 0) {
      throw { message: 'enter a valid keyCompose argument' };
    }
    keyCompose.forEach(key => {
      id += ` ${key} `;
    });
    id = Buffer.from(`${id}}`).toString('base64');
    try {
      await this.getOne(id);
      throw { message: 'this value is already in database / key violation' };
    } catch (err) {
      console.error(err);
    }
    return new Promise<void>((resolve, reject) => {
      request.put(`${this.bdUrl}/${this.tableName}/${id}.json`, {
        json: { ...data, id }
      }, (err) => {
        if (err) {
          reject({ err });
        } else {
          resolve();
        }
      });
    });
  }

  async delete(id: string) {
    return new Promise<void>((resolve, reject) => {
      request.delete(`${this.bdUrl}/${this.tableName}/${id}.json`, (err) => {
        if (err) {
          reject({ err });
        } else {
          resolve();
        }
      });
    });
  }

  protected async update(id: string, data: T | Partial<T>) {
    return new Promise<void>((resolve, reject) => {
      request.patch(`${this.bdUrl}/${this.tableName}/${id}.json`, {
        json: data
      }, (err) => {
        if (err) {
          reject({ err });
        } else {
          resolve();
        }
      });
    });
  }

}
