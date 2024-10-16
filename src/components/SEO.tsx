import { Helmet } from 'react-helmet-async';

interface SeoType {
    title?: string;
    description?: string;
    name?: string;
    type?: string;
}

export default function SEO({ title = "Default Title", description = "Default description", name = "Default Name", type = "website" }: SeoType) {
    return (
        <Helmet>
            {/* Standard metadata tags */}
            <title>{title} | Yeoley</title>
            <meta name="description" content={description} />

            {/* Facebook tags */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />

            {/* Twitter tags */}
            <meta name="twitter:creator" content={name} />
            <meta name="twitter:card" content={type} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
        </Helmet>
    );
}
