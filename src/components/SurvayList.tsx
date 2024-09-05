import { ChevronRightIcon } from '@heroicons/react/20/solid'

const people = [
    {
        id: 1,
        name: 'Mining Survey 1998',
        email: 'Survey Company Name ',
        role: 'Purchase to view',
        imageUrl:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        href: '#',
        lastSeen: 'Viewable for 3 days',
        lastSeenDateTime: '2024-01-23T13:23Z',
    },
    {
        id: 2,
        name: 'Structural Survey 2015',
        email: 'Survey Company Name ',
        role: 'Purchase to view',
        imageUrl:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        href: '#',
        lastSeen: 'Viewable for 3 days',
        lastSeenDateTime: '2024-01-23T13:23Z',
    },
    {
        id: 3,
        name: 'Flooding & Drainage Survey 2015',
        email: 'Survey Company Name ',
        role: 'Purchase to view',
        imageUrl:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        href: '#',
        lastSeen: 'Viewable for 3 days',
        lastSeenDateTime: '2024-01-23T13:23Z',
    },

]

export default function SurveyList() {
    return (
        <div className="mt-10">
            <h2 className="text-md font-semibold  text-gray-900 mb-2 underline">Surveys & Documents</h2>
            <ul
                role="list"
                className="divide-y divide-gray-100 overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-b-xl"
            >
                {people.map((person) => (
                    <li key={person.id} className="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6">
                        <div className="flex min-w-0 gap-x-4">
                            <img alt="" src={person.imageUrl} className="h-12 w-12 flex-none rounded-full bg-gray-50" />
                            <div className="min-w-0 flex-auto">
                                <p className="text-sm font-semibold leading-6 text-gray-900">
                                    <a href={person.href}>
                                        <span className="absolute inset-x-0 -top-px bottom-0" />
                                        {person.name}
                                    </a>
                                </p>
                                <p className="mt-1 flex text-xs leading-5 text-gray-500">
                                    <a href={`mailto:${person.email}`} className="relative truncate hover:underline">
                                        {person.email}
                                    </a>
                                </p>
                            </div>
                        </div>
                        <div className="flex shrink-0 items-center gap-x-4">
                            <div className="hidden sm:flex sm:flex-col sm:items-end">
                                <button  type="button" className="text-sm leading-6 text-gray-900 bg-yellow-300 px-3 rounded-3xl font-semibold">{person.role}</button>
                                {person.lastSeen ? (
                                    <p className="mt-1 text-xs leading-5 text-gray-500">
                                        Last seen <time dateTime={person.lastSeenDateTime}>{person.lastSeen}</time>
                                    </p>
                                ) : (
                                    <div className="mt-1 flex items-center gap-x-1.5">
                                        <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                                            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                        </div>
                                        <p className="text-xs leading-5 text-gray-500">Online</p>
                                    </div>
                                )}
                            </div>
                            <ChevronRightIcon aria-hidden="true" className="h-5 w-5 flex-none text-gray-400" />
                        </div>
                    </li>
                ))}
            </ul>
        </div>

    )
}
