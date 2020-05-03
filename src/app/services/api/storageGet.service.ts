import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";

@Injectable()
export class StorageGetService {
  constructor(public storage: Storage) {}

  async getKey(key: string): Promise<string> {
    return await this.storage.get(key);
  }
}
