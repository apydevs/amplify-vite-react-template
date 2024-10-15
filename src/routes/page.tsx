
import { useParams } from 'react-router-dom';
import {useGetPageQuery} from "../hooks/guest/useGetPageQuery.ts";
import Layout1 from "../blog/layout1.tsx";
import Layout2 from "../blog/Layout2.tsx";
import Layout3 from "../blog/Layout3.tsx";



function Page() {
    const { informationId } = useParams();
    // const [error, setError] = useState(false);
    const { loading, error, data } = useGetPageQuery(informationId?.toString() ?? '');
    // useEffect(() => {
    //     const fetchData = async () => {
    //         setIsLoading(true);
    //         if (informationId) {
    //             try { /* empty */ } catch (error) {
    //                 console.error('Error fetching todo:', error);
    //                 setError(true);
    //             }
    //         } else {
    //             try {
    //
    //                 /* empty */
    //             } catch (error) {
    //                 console.error('Error fetching todos:', error);
    //                 setError(true);
    //             }
    //         }
    //         setIsLoading(false);
    //     };
    //
    //     fetchData();
    // }, [informationId]); // Depend on informationId to re-fetch when it changes

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading the data.</div>;
    }
    if (data && data.page.layout == '1') {
        return (
            <div>
                <Layout1/>
            </div>
        )
    }

    if (data && data.page.layout == '2') {
        return (
            <div>
                <Layout2/>
            </div>
        )
    }
    if (data && data.page.layout == '3') {
        return (
            <div className="mb-10">
                <Layout3
                    headerTitle={data.page.header_title}
                    headerSubtitle={data.page.header_subtitle}
                    title={data.page.title}

                    contentLead={data.page.content_lead}
                    contentMain={data.page.content_main}
                    contentAction={data.page.content_action}


                />
            </div>
        )
    }

    // if (informationId && data ) {
    //     return (
    //         <div className="container max-w-7xl mx-auto">
    //             <div className="mx-auto max-w-2xl text-center">
    //                 <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">From the blog</h2>
    //                 <p className="mt-2 text-lg leading-8 text-gray-600">
    //                     Learn how to grow your business with our expert advice.
    //                 </p>
    //             </div>
    //             <div className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
    //                 {dataTodos.map(todo => (
    //                     <article
    //                         key={todo.id}
    //                         className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80"
    //                     >
    //                         <img alt="" src="https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80" className="absolute inset-0 -z-10 h-full w-full object-cover" />
    //                         <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
    //                         <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
    //
    //                         <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
    //
    //                             <div className="-ml-4 flex items-center gap-x-4 ">
    //                                 <svg viewBox="0 0 2 2" className="-ml-0.5 h-0.5 w-0.5 flex-none fill-white/50">
    //                                     <circle r={1} cx={1} cy={1} />
    //                                 </svg>
    //                                 <div className="flex gap-x-2.5">
    //                                     <img alt="" src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    //                                     className="h-6 w-6 flex-none object-cover rounded-full bg-white/10" />
    //                                     {todo.id}
    //                                 </div>
    //                             </div>
    //                         </div>
    //                         <h3 className="mt-3 text-lg font-semibold leading-6 text-white">
    //                             <Link to={`/information/${todo.id}`}>
    //                                 <span className="absolute inset-0" />
    //                                 {todo.content}
    //                             </Link>
    //                         </h3>
    //                     </article>
    //
    //                 ))}
    //             </div>
    //         </div>
    //     );
    // } else if (informationId && dataTodo) {
    //     return (
    //         <div>
    //             <h1>Info Page Results</h1>
    //             <p>{dataTodo.content || 'No content available'}</p>
    //         </div>
    //     );
    // } else {
    //     return (
    //         <div>
    //             <h1>404</h1>
    //         </div>
    //     );
    // }
}

export default Page;
