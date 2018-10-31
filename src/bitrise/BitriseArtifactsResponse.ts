export interface BitriseArtifactsResponse {
    "data": [BitriseArtifactItemResponse]
}

export interface BitriseArtifactItemResponse {
    "title": string,
    "slug": string
}

export interface BitriseSingleArtifactDataResponse {
    "data": BitriseSingleArtifactResponse
}

export interface BitriseSingleArtifactResponse {
    "expiring_download_url": string
}