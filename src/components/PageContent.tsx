interface PageContentProps {
    title: string;
    content: string;
}

export default function PageContent({ title, content }: PageContentProps) {
    return (
        <div className="page-content">
            <h1 className="text-4xl font-bold mb-8">{title}</h1>
            <div className="content">
                {/* Here you can add any custom styling or components to render your content */}
                <p>{content}</p>
            </div>
        </div>
    );
} 