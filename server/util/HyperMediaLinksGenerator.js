function generateLinks(element, hostname, url, selfId, endPoints) {
  for (let i = 0; i < endPoints.length; i += 1) {
    if (endPoints[i] !== 'self') {
      const linkBody = {
        rel: endPoints[i],
        href: `http://${hostname}${url}/${selfId}/${endPoints[i]}`,
      };
      element.Links.push(linkBody);
    } else {
      const linkBody = {
        rel: endPoints[i],
        href: `http://${hostname}${url}/${selfId}`,
      };
      element.Links.push(linkBody);
    }
  }
}


function UrlCleaner(url) {
  if (url.endsWith('/')) {
    const urlEnd = url.replace(/\/\/+/g, '/');
    return urlEnd.substring(0, urlEnd.length - 1);
  }
  return url;
}


function hateaosGenerator(documents, hostName, url, endPoints) {

  const newUrl = UrlCleaner(url);

  if (typeof endPoints === 'object') {
    documents.forEach((element) => {
      generateLinks(element, hostName, newUrl, element._id, endPoints);
    });
  } else if (typeof endPoints === 'string') {
    documents.forEach((element) => {
      const linkBody = {
        rel: endPoints,
        href: `http://${hostName}${newUrl}/${element._id}`,
      };
      element.Links.push(linkBody);
    });
  }
}

export default hateaosGenerator;
