import { useState } from 'react';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

// Define the type for company type
interface CompanyType {
    id: number;
    name: string;
}

// The data array
const data: CompanyType[] = [
    { id: 1, name: 'Sole Trader' },
    { id: 2, name: 'Partnership' },
    { id: 3, name: 'Limited Company' },
    { id: 4, name: 'Public limited company (PLC)' },
    { id: 5, name: 'Limited liability company (LLC)' },
    { id: 6, name: 'CIC Community Interest Company' },
    { id: 7, name: 'Charity / Nonprofit' },
    { id: 8, name: 'Other' },
];

// The component now accepts the onSelectChange callback
interface SelectBoxCompanyTypeProps {
    onSelectChange: (selectedCompany: CompanyType) => void;
}

export default function SelectBoxCompanyType({ onSelectChange }: SelectBoxCompanyTypeProps) {
    const [selected, setSelected] = useState<CompanyType>(data[1]);

    const handleChange = (value: CompanyType) => {
        setSelected(value);
        // Pass the selected value to the parent component
        onSelectChange(value);
    };

    return (
        <Listbox value={selected} onChange={handleChange}>
            <div className="relative">
                <ListboxButton className="relative w-full cursor-default rounded-xl bg-white py-3 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-2 ring-inset ring-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-300 sm:text-sm sm:leading-6">
                    <span className="block truncate">{selected.name}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
          </span>
                </ListboxButton>

                <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {data.map((company) => (
                        <ListboxOption
                            key={company.id}
                            value={company}
                            className="group relative cursor-default select-none py-2 pl-8 pr-4 text-gray-900 data-[focus]:bg-yellow-300 data-[focus]:text-white"
                        >
                            <span className="block truncate font-normal group-data-[selected]:font-semibold">{company.name}</span>
                            <span className="absolute inset-y-0 left-0 flex items-center pl-1.5 text-indigo-600 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                <CheckIcon aria-hidden="true" className="h-5 w-5" />
              </span>
                        </ListboxOption>
                    ))}
                </ListboxOptions>
            </div>
        </Listbox>
    );
}

