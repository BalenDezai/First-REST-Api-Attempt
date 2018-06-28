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

function hateoasGenerator(record, hostName, url, endPoints, isChild) {
  //  replace the double forward slash with one for link generator
  const newUrl = removeTrailingSlashes(url);
  if (isChild) {
    generateChildLinks(record, hostName, url, endPoints);
  } else {
    generateLinks(record, hostName, newUrl, endPoints);
  }
}


module.exports = hateoasGenerator;
