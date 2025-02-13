export interface Dog {
    id: string;
    img: string;
    name: string;
    age: number;
    zip_code: string;
    breed: string;
}

export interface Location {
    zip_code: string;
    latitude: number;
    longitude: number;
    city: string;
    state: string;
    county: string;
}

export interface SearchFilters {
    breeds: string[];
    zipCodes?: string[];
    ageMin?: number;
    ageMax?: number;
    size?: number;
    sort?: string;
    from?: number;
    zip_code?: string;
}

export interface SearchResponse {
    resultIds: string[];
    total: number;
    next?: string;
    prev?: string;
}