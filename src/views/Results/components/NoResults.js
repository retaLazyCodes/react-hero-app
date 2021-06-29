import React, { useEffect } from "react";
import Swal from "sweetalert2";

export default React.memo(function NoResults() {

  useEffect(() => {
    Swal.fire({
      icon: 'warning',
      title: 'Alert',
      text: 'No results found',
    })
  }, [])

  return (
    <div>
      <p>{`No se han encontrado resultados`}</p>
    </div>
  );
});