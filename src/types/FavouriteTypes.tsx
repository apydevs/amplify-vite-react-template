import {PropertyType} from "./PropertyTypes.tsx";

export type CreateFavoriteType = {
    readonly id?: string; // Non-nullable as auto-generated
    userId: string;
    propertyId: string;
};


export type PropertyFavoriteObjectType = {
    readonly id?: string; // Non-nullable as auto-generated
    userId: string; // Non-nullable as per your requirements
    propertyId: string; // Non-nullable as per your requirements
    propertyRel?: PropertyType | never; // Allow null if the relationship might not always be present
}

export type PropertyFavoriteType = {
    saved: PropertyFavoriteObjectType[];
};