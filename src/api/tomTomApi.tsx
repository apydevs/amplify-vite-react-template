// src/api/todoApi.ts
import {Search} from "../types/TomTomTypes.tsx";

// Function to list all Todos
export const fetchSearchResults = async (query: Search): Promise<{ name: string | undefined; id: string }[]> => {
    const apiKey = '5XtQljyBGnl8QqwlwqkXhqYnzL2eYZnS'; // Replace 'YOUR_API_KEY' with your actual API key
    const baseUrl = `https://api.tomtom.com/search/2/search/${query.query}.json`;
    const queryParams = new URLSearchParams({
        typeahead: true.toString(), // Convert boolean to string explicitly at the point of assignment
        limit: '30',
        countrySet: 'GB',
        extendedPostalCodesFor: 'Geo',
        minFuzzyLevel: '1',
        maxFuzzyLevel: '2',
        idxSet: 'Geo',
        view: 'Unified',
        relatedPois: 'off',
        key: apiKey
    });

    const url = `${baseUrl}?${queryParams.toString()}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': '*/*'
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return  await response.json();




    } catch (error) {
        console.error('Failed to fetch data:', error);
        return [];
    }
};


