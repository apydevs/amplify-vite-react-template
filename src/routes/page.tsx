
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
        return <div className="h-screen max-w-7xl mx-auto">


            <div role="status"
                 className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center">
                <div
                    className="flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
                    <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true"
                         xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                        <path
                            d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                    </svg>
                </div>
                <div className="w-full">
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
                </div>
                <span className="sr-only">Loading...</span>
            </div>


            <div role="status" className="space-y-2.5 animate-pulse max-w-lg">
                <div className="flex items-center w-full">
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32"></div>
                    <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
                    <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                </div>
                <div className="flex items-center w-full max-w-[480px]">
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                    <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                    <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
                </div>
                <div className="flex items-center w-full max-w-[400px]">
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                    <div className="h-2.5 ms-2 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
                    <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                </div>
                <div className="flex items-center w-full max-w-[480px]">
                    <div className="h-2.5 ms-2 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                    <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                    <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
                </div>
                <div className="flex items-center w-full max-w-[440px]">
                    <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-32"></div>
                    <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
                    <div className="h-2.5 ms-2 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                </div>
                <div className="flex items-center w-full max-w-[360px]">
                    <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                    <div className="h-2.5 ms-2 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
                    <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                </div>
                <span className="sr-only">Loading...</span>
            </div>

        </div>;
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
                    metaDescription={data.page.meta_description}
                    contentLead={data.page.content_lead}
                    contentMain={data.page.content_main}
                    contentAction={data.page.content_action}
                    contentSummary={data.page.content_summary}


                />
            </div>
        )
    }
}

export default Page;
