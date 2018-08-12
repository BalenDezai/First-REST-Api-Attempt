function generateLinks(record, hostname, url, endPoints) {
  for (let i = 0; i < endPoints.length; i += 1) {
    if (endPoints[i].rel === 'owner') {
      //  shave off everything after the last slash in the url
      const newUrl = url.substring(0, url.lastIndexOf('/') + 1);
      record.links.push({
        rel: endPoints[i].rel,
        type: endPoints[i].type,
        href: `http://${hostname}${newUrl}`,
        description: endPoints[i].description,
      });
    } else if (endPoints[i].rel !== 'self') {
      record.links.push({
        rel: endPoints[i].rel,
        type: endPoints[i].type,
        href: `http://${hostname}${url}/${record._id}/${endPoints[i].rel}`,
        description: endPoints[i].description,
      });
    } else {
      record.links.push({
        rel: endPoints[i].rel,
        type: endPoints[i].type,
        href: `http://${hostname}${url}/${record._id}`,
        description: endPoints[i].description,
      });
    }
  }
}


function generateChildLinks(record, hostname, url, endPoints) {
  for (let i = 0; i < endPoints.length; i += 1) {
    if (endPoints[i].rel === 'owner') {
      //  shave off everything after the last slash in the url
      const newUrl = url.substring(0, url.lastIndexOf('/') + 1);
      record.links.push({
        rel: endPoints[i].rel,
        type: endPoints[i].type,
        href: `http://${hostname}${newUrl}`,
        description: endPoints[i].description,
      });
    } else {
      record.links.push({
        rel: endPoints[i].rel,
        type: endPoints[i].type,
        href: `http://${hostname}${url}`,
        description: endPoints[i].description,
      });
    }
  }
}

function removeTrailingSlashes(url) {
  if (url.endsWith('/')) {
    //  replace the double forward slash with one
    const urlEnd = url.replace(/\/\/+/g, '/');
    //  remove the single forward slashamrk
    return urlEnd.substring(0, urlEnd.length - 1);
  }
  return url;
}

function removeQueryString(url) {
  return url.substring(0, url.lastIndexOf('?'));
}

function removeEverythingAfterSlash(url, amountOfSlashes) {
  let newUrl;
  for (let i = 0; i < amountOfSlashes; i += 1) {
    newUrl = url.substring(0, url.lastIndexOf('/'));
  }
  return newUrl;
}

function hateoasGenerator(record, hostName, url, endPoints, opts) {
  //  replace the double forward slash with one for link generator
  const options = opts || {};
  let newUrl = removeTrailingSlashes(url);
  if (options.queryString) {
    newUrl = removeQueryString(newUrl);
  }
  if (options.removeAfterSlash && options.removeAfterSlash > 0) {
    newUrl = removeEverythingAfterSlash(newUrl, options.removeAfterSlash);
  }
  if (options.isChild) {
    generateChildLinks(record, hostName, url, endPoints);
  } else {
    generateLinks(record, hostName, newUrl, endPoints);
  }
}


module.exports = hateoasGenerator;
