function generateLinks(element, hostname, url, endPoints) {
  for (let i = 0; i < endPoints.length; i += 1) {
    if (endPoints[i].rel !== 'self') {
      const linkBody = {
        rel: endPoints[i].rel,
        type: endPoints[i].type,
        href: `http://${hostname}${url}/${element._id}/${endPoints[i].rel}`,
        description: endPoints[i].description,
      };
      element.links.push(linkBody);
    } else {
      const linkBody = {
        rel: endPoints[i].rel,
        type: endPoints[i].type,
        href: `http://${hostname}${url}/${element._id}`,
        description: endPoints[i].description,
      };
      element.links.push(linkBody);
    }
  }
}

function UrlCleaner(url) {
  if (url.endsWith('/')) {
    //  replace the double forward slash with one
    const urlEnd = url.replace(/\/\/+/g, '/');
    //  remove the single forward slashamrk
    return urlEnd.substring(0, urlEnd.length - 1);
  }
  return url;
}

function hateaosGenerator(documents, hostName, url, endPoints) {
  const newUrl = UrlCleaner(url);

  if (Array.isArray(documents)) {
    documents.forEach((element) => {
      generateLinks(element, hostName, newUrl, endPoints);
    });
  } else {
    generateLinks(documents, hostName, url, endPoints);
  }
}


module.exports = hateaosGenerator;
