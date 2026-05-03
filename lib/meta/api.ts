// TODO (Fase 2 — Integração Meta Marketing API):
// Implementar:
//   getAdAccountInsights(accessToken, adAccountId, dateRange)
//   getCampaignList(accessToken, adAccountId)
//   getLeadgenForms(accessToken, adAccountId)
//   exchangeShortLivedToken(shortLivedToken) — retorna long-lived (60d)
// Documentação: https://developers.facebook.com/docs/marketing-api

export const META_GRAPH_VERSION = "v21.0"
export const META_BASE_URL = `https://graph.facebook.com/${META_GRAPH_VERSION}`
