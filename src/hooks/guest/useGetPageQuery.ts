import {gql, useQuery} from "@apollo/client";

const GET_PAGE = gql`
    query page($slug: String!) {
        page(slug: $slug) {
                title,
                slug,
                meta_description
                layout,
            header_title,
            header_subtitle,
            author {
                name
            }
            content_lead,
            content_main
            content_action
            content_summary
            }
        
        }
`;

export const useGetPageQuery = (slug: string) => {
    const { loading, error, data } = useQuery(GET_PAGE, {
        variables: { slug: slug },
        context: {
            uri: '/pages',
        },
    });
    return {
        loading,
        error,
        data,
    };
}
