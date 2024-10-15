'use client'
import { useEffect, useState } from "react";

interface OfferInputProps {
    maxOffer: string;
    index: number;
    onOfferChange: (index: number, value: number) => void; // Callback to pass values to the parent component
}

function numberFormat(value: number): string {
    return new Intl.NumberFormat('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
}

export default function OfferInput({ maxOffer, index, onOfferChange }: OfferInputProps) {
    const [inputValue, setInputValue] = useState<string>(""); // Local state for the input value
    const [max, setMax] = useState<number>(0);

    useEffect(() => {
        // Replace commas and parse with parseFloat to retain decimal places
        const parsedMax = parseFloat(maxOffer.replace(/,/g, ''));
        setMax(parsedMax);
    }, [maxOffer]);

    function autoOffer() {
        const parsedMax = parseFloat(maxOffer.replace(/,/g, ''));
        if (isNaN(parsedMax)) {
            console.error("Invalid maxOffer value.");
            return;
        }

        // Generate a random offer value and set it (capping at maxOffer)
        const randomOffer = Math.min(Math.floor(Math.random() * parsedMax) + 1000, parsedMax);

        // Set the formatted value in the input value state
        const formattedValue = numberFormat(randomOffer);
        setInputValue(formattedValue);

        // Pass the updated value to the parent component
        onOfferChange(index, randomOffer);
    }

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { value } = event.target;
        setInputValue(value);
    }

    function handleInputBlur() {
        const parsedValue = parseFloat(inputValue.replace(/,/g, ''));

        if (isNaN(parsedValue) || parsedValue === 0) {
            // Clear the value if it's invalid or zero
            setInputValue("");
            onOfferChange(index, 0);
        } else if (parsedValue > max) {
            // If the value exceeds maxOffer, show an alert and clear the input
            alert('Offer exceeds the maximum allowed value.');
            setInputValue("");
            onOfferChange(index, 0);
        } else {
            // Update the formatted value and pass it to the parent component
            const formattedValue = numberFormat(parsedValue);
            setInputValue(formattedValue);
            onOfferChange(index, parsedValue);
        }
    }

    return (
        <>
            <div className="flex flex-row items-center justify-between rounded-lg border-2 border-yellow-300 bg-white">
                <span className="px-3 text-gray-400"> #{index + 1}</span>
                <span className="text-black"> £</span>
                <input
                    className="offerAmount m-1 pr-4 py-4 w-full max-w-xl border-y-0 border-yellow-300 focus:outline-none ring-0 focus:ring-0"
                    placeholder="Offer amount"
                    value={inputValue}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur} // Format value when input loses focus
                />
                <div className="m-0.5 px-1 py-1">
                    <button
                        onClick={autoOffer}
                        className="border-2 border-yellow-300 rounded-2xl px-4 py-2 hover:bg-black hover:text-white hover:border-gray-200">
                        Auto
                    </button>
                </div>
            </div>
        </>
    );
}