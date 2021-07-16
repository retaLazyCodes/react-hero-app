import React, { useEffect } from "react";
import AlertService from '../../../components/alertService/AlertService'

export default React.memo(function NoResults() {

  useEffect(() => {
    AlertService.error('Alert','No results found')
  }, [])

  return (
    <div>
      <p style={{fontSize: '1.4rem'}}>{`No se han encontrado resultados`}</p>
    </div>
  );
});