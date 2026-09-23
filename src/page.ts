export const enum PageType {
    Post,
    Reference,
    Update,
    Note,
    Other,
}

export interface OpenGraph {
    type: string;
    title?: string;
    description?: string;
    image?: string;
}

export interface Page {
    type: PageType;
    extension: string;
    url: string;
    content: string;
    sourcePath?: string;
    title?: string;
    date?: Date;
    backlinks?: Array<Page>;
    pagination?: {
        items: Array<unknown>;
        pageNumber: number;
        pageCount: number;
        href: {
            prev?: string;
            next?: string;
        };
    };
    og?: OpenGraph;
    data: Record<string, unknown>;
}
