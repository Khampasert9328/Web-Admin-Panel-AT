export interface DeleteTeamsModels {
    data?: Datum[];
}

export interface Datum {
    _id?:         string;
    name_en?:     string;
    surname_en?:  string;
    position_en?: string;
    logo_en?:     string;
    createdAt?:   Date;
    updatedAt?:   Date;
    __v?:         number;
}
