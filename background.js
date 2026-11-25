
function isAllowedHost(host) {
    const allowedDomains = [
        "proton.me", "protonmail.com", "protonvpn.com"
    ];

    return allowedDomains.some(
        domain => host === domain || host.endsWith("." + domain)
    );
}

function handleProxyRequest(requestInfo) {
    const url = new URL(requestInfo.url);

    const isProxied = isAllowedHost(url.hostname);

    if (!isProxied) {
        return { type: "direct" };
    }
        console.log("Proxying request to:", url.href);
        return {
            type: "https",
            host: "cdn.klukva.mom",
            port: 443,
            proxyAuthorizationHeader: "Basic " + btoa("2d1e6f17d5410063ca60ee4fa4858924:e7bca8a8949561046fcc4bf5d79b2b8c")
        };
}

browser.proxy.onRequest.addListener(handleProxyRequest, {
  urls: ["<all_urls>"],
});
