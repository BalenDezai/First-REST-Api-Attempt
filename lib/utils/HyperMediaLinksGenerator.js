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

function hateaosGenerator(documents, hostName, url, endPoints) {
  if (typeof endPoints === 'object') {
    documents.forEach((element) => {
      generateLinks(element, hostName, url, element._id, endPoints);
    });
  } else if (typeof endPoints === 'string') {
    documents.forEach((element) => {
      const linkBody = {
        rel: endPoints,
        href: `http://${hostName}${url}/${element._id}`,
      };
      element.Links.push(linkBody);
    });
  }
}

export default hateaosGenerator;
