import { faFileExport } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from 'react';
import { Route } from '../../models/Route';

export const Exporter: React.FC<{ routes: Route[] }> = ({ routes }) => {
  const [downloadLink, setDownloadLink] = useState('');

  useEffect(() => {
    const json = JSON.stringify(routes, null, 2);
    const blob = new Blob([json], { type: "application/json" });

    setDownloadLink(downloadLink => {
      // this part avoids memory leaks
      if (downloadLink !== '')
        window.URL.revokeObjectURL(downloadLink);

      return window.URL.createObjectURL(blob);
    });

  }, [routes]);

  return <a download='routes.json' href={downloadLink}>
    <FontAwesomeIcon icon={faFileExport} title="Export route details"/>
  </a>;
};
