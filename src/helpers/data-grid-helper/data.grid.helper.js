import {columnDef as airbnbColumnDef} from "./airbnb-columns";
import {columnDef as zillowColumnDef} from "./zillow-columns";

export function getGridColumnDefinition(provider) {
    if(provider.toLowerCase() === 'airbnb') {
        return airbnbColumnDef;
    } else if(provider.toLowerCase() === 'zillow') {
        return zillowColumnDef;
    }
}