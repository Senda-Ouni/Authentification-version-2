import { Injectable } from '@angular/core';
import { IndexedDbObjectStoreModel, UserAccessModel } from 'app/shared/models/Login.models';
import { openDB, deleteDB } from "idb";

@Injectable({
  providedIn: 'root'
})
export class IndexedDBService {

  private _dbName = "Authentification_DB";
  private _storeName = "accessProperties";
  constructor() { }

  private async connectToIDB() {
    return await openDB(this._dbName, 2, {
      upgrade(db, oldVersion, newVersion, transaction) {
        console.log(oldVersion);
        switch (oldVersion) {
          case 0: // no db created before
            // a store introduced in version 1
            if (db.objectStoreNames.contains("accessProperties")) {
              db.deleteObjectStore("accessProperties");
            }
            break;
          case 1:
            if (db.objectStoreNames.contains("accessProperties_v1")) {
              db.deleteObjectStore("accessProperties_v1");
            }
            break;
        }
        if (!db.objectStoreNames.contains("accessProperties_v2")) {
          db.createObjectStore("accessProperties_v2", { keyPath: "key" });
        }
      },
    });
  }

  async putUserAccessValues(
    userEmail: string,
    userAccess: UserAccessModel
  ) {
    // set db1/store1/delivered to be false:
    const db = await this.connectToIDB();
    const transaction = db.transaction(this._storeName, "readwrite");
    const store = transaction.objectStore(this._storeName);
    store.put({ key: "userEmail", value: userEmail });
    store.put({ key: "userFullName", value: userAccess.fullName });
    store.put({ key: "userTokenValue", value: userAccess.token });
    store.put({
      key: "sessionDaysToken",
      value: userAccess.sessionDaysToken.toString(),
    });

    // monitor if the transaction was successful:
    transaction.done
      .then(() => {
        console.log("All steps succeeded, changes committed!");
      })
      .catch(() => {
        console.error("Something went wrong, transaction aborted");
      });
    db.close();
  }
  async get(key: string): Promise<IndexedDbObjectStoreModel> {
    const db = await this.connectToIDB();
    const transaction = db.transaction(this._storeName, "readonly");
    const store = transaction.objectStore(this._storeName);
    const data = store.get(key);
    return data;
  }

  public async deleteDataBase(){
    await deleteDB(this._dbName);
  }


  async removeAllData() {
    const db = await this.connectToIDB().then();
    const transaction = db.transaction(this._storeName, "readwrite");
    const store = transaction.objectStore(this._storeName);
    store.clear();

    // monitor if the transaction was successful:
    transaction.done
      .then(() => {
        console.log("All steps succeeded, changes committed!");
      })
      .catch(() => {
        console.error("Something went wrong, transaction aborted");
      });
    db.close();
  }

}
