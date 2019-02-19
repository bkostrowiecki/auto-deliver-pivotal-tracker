export default interface BitriseWebhookReponse {
    "build_slug": string,
    "app_slug": string,
    "build_status": number,
    "git": {
      "src_branch": string
    }
  }