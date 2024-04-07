export interface searchTokenProp {
    token : string,
    user : {
        display_name: string,
        external_urls: {spotify: string}
        href: string,
        id: string,
        images: [],
        type: string,
        uri: string,
        followers: {href: string, total: number},
        country: string,
        product: string,
        explicit_content: {filter_enabled: boolean, filter_locked: boolean},
        email: string,
    }
}


export interface playlistTokenProp {
    token : string,
    user : {
        display_name: string,
        external_urls: {spotify: string}
        href: string,
        id: string,
        images: [],
        type: string,
        uri: string,
        followers: {href: string, total: number},
        country: string,
        product: string,
        explicit_content: {filter_enabled: boolean, filter_locked: boolean},
        email: string,
    },
}


interface image {
    url: string,
    height: number,
    width: number,
}

export interface playlistProp {
    collaborative: boolean,
    description: string,
    external_urls: {
        spotify: string
    },
    href : string,
    id: string,
    images: image[],
    name: string,
    owner: {
        erternal_urls: {
            spotify: string
        },
        followers: {
            href: string,
            total: number
        },
        href: string,
        id: string,
        type: string,
        uri: string,
        display_name: string | null
    },
    public: boolean,
    snapshot_id : string,
    tracks : {
        href: string,
        total: number
    },
    type: string,
    uri: string,
}

interface artist {
    external_urls: {
        spotify: string
    },
    href: string,
    id: string,
    name: string,
    type: string,
    uri: string
}


export interface topTrackProp{
    album : {
        album_name: string,
        total_tracks: 16,
        available_markets: string[],
        images: image[],
        name: string,
    }
    external_urls: {
        spotify: string
    }
        href: string,
        id: string,
        name: string,
        release_date: string,
        release_date_precision: string,
        type: string,
        uri: string,
        artists: artist[]
}