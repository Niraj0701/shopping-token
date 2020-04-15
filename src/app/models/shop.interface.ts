export interface IShop {
   name: string;
   coords: ICoords;
   address: string;
   start_time: string;
   end_time: string;
   slots: string[];
   business_type: string;
   id: number;
   users_allowed?: number;
   slot_size_min?: number;
   distance?: string;
}

export interface ICoords {
   longitude: number;
   latitude: number;
}