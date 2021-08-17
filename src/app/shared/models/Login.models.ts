export class UserLoginModel {
login: string;
password: string;
}


export class UserAccessModel {
  fullName: string;
  token: string;
  sessionDaysToken: number;
}


export class IndexedDbObjectStoreModel {
  key: string;
  value: any;

  constructor(key: string, value: any) {
    this.key = key;
    this.value = value;
  }
}
